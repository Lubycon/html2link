import { useReducer } from 'react';
import { useCalculator } from './useCalculator';

// 계산기 상태 타입
export interface CalculatorState {
  expression: string;
  display: string;
  showResult: boolean;
  hasError: boolean;
}

// 계산기 액션 타입
export type CalculatorAction =
  | { type: 'INPUT_NUMBER'; payload: string }
  | { type: 'INPUT_OPERATOR'; payload: '+' | '-' | '×' | '÷' }
  | { type: 'INPUT_DECIMAL' }
  | { type: 'CALCULATE'; payload: { result: number | null } }
  | { type: 'CLEAR' }
  | { type: 'BACKSPACE' }
  | { type: 'TOGGLE_SIGN' }
  | { type: 'PERCENTAGE' };

// 초기 상태
const initialState: CalculatorState = {
  expression: '',
  display: '0',
  showResult: false,
  hasError: false,
};

// 유틸리티 함수들
const getLastOperatorIndex = (expression: string): number => {
  return Math.max(
    expression.lastIndexOf('+'),
    expression.lastIndexOf('-'),
    expression.lastIndexOf('×'),
    expression.lastIndexOf('÷'),
  );
};

const updateExpressionWithNewNumber = (expression: string, newNumber: string): string => {
  const lastOperatorIndex = getLastOperatorIndex(expression);
  if (lastOperatorIndex === -1) {
    return newNumber;
  }
  return expression.substring(0, lastOperatorIndex + 1) + newNumber;
};

// 리듀서 함수
function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'INPUT_NUMBER': {
      const { payload: num } = action;

      if (state.showResult) {
        // 결과가 표시된 후 숫자를 입력하면 새로 시작
        return {
          ...initialState,
          expression: num,
          display: num,
        };
      }

      const newDisplay = state.display === '0' ? num : state.display + num;

      let newExpression: string;
      if (state.expression === '') {
        newExpression = num;
      } else {
        newExpression = updateExpressionWithNewNumber(state.expression, newDisplay);
      }

      return {
        ...state,
        expression: newExpression,
        display: newDisplay,
        hasError: false,
      };
    }

    case 'INPUT_OPERATOR': {
      const { payload: operator } = action;

      if (state.showResult) {
        return {
          ...state,
          expression: state.display + operator,
          showResult: false,
          display: '0',
        };
      }

      const lastChar = state.expression[state.expression.length - 1];
      if (['+', '-', '×', '÷'].includes(lastChar)) {
        return {
          ...state,
          expression: state.expression.slice(0, -1) + operator,
          display: '0',
        };
      }

      return {
        ...state,
        expression: state.expression + operator,
        display: '0',
      };
    }

    case 'INPUT_DECIMAL': {
      if (state.showResult) {
        // 결과가 표시된 후 소수점을 입력하면 새로 시작
        return {
          ...initialState,
          expression: '0.',
          display: '0.',
        };
      }

      if (state.display.includes('.')) {
        return state; // 이미 소수점이 있으면 무시
      }

      const newDisplay = `${state.display}.`;
      const newExpression = updateExpressionWithNewNumber(state.expression, newDisplay);

      return {
        ...state,
        expression: newExpression,
        display: newDisplay,
      };
    }

    case 'CALCULATE': {
      const { result } = action.payload;

      if (result !== null) {
        return {
          ...state,
          expression: `${state.expression}=${result}`,
          display: String(result),
          showResult: true,
          hasError: false,
        };
      }

      return {
        ...state,
        display: 'Error',
        hasError: true,
        showResult: true,
      };
    }

    case 'CLEAR': {
      return initialState;
    }

    case 'BACKSPACE': {
      if (state.showResult) {
        return initialState;
      }

      if (state.expression.length <= 1) {
        return initialState;
      }

      const newExpression = state.expression.slice(0, -1);
      const lastChar = state.expression[state.expression.length - 1];

      // 연산자를 지웠다면
      if (['+', '-', '×', '÷'].includes(lastChar)) {
        const lastOperatorIndex = getLastOperatorIndex(newExpression);
        const newDisplay =
          lastOperatorIndex === -1 ? newExpression || '0' : newExpression.substring(lastOperatorIndex + 1) || '0';

        return {
          ...state,
          expression: newExpression,
          display: newDisplay,
        };
      }

      // 숫자를 지웠다면
      const lastOperatorIndex = getLastOperatorIndex(newExpression);
      const newDisplay =
        lastOperatorIndex === -1 ? newExpression || '0' : newExpression.substring(lastOperatorIndex + 1) || '0';

      return {
        ...state,
        expression: newExpression,
        display: newDisplay,
      };
    }

    case 'TOGGLE_SIGN': {
      if (state.showResult || state.hasError) {
        return state;
      }

      const currentValue = Number.parseFloat(state.display);
      const newValue = -currentValue;
      const newDisplay = String(newValue);
      const newExpression = updateExpressionWithNewNumber(state.expression, newDisplay);

      return {
        ...state,
        expression: newExpression,
        display: newDisplay,
      };
    }

    case 'PERCENTAGE': {
      if (state.showResult || state.hasError) {
        return state;
      }

      const currentValue = Number.parseFloat(state.display);
      const newValue = currentValue / 100;
      const newDisplay = String(newValue);
      const newExpression = updateExpressionWithNewNumber(state.expression, newDisplay);

      return {
        ...state,
        expression: newExpression,
        display: newDisplay,
      };
    }

    default:
      return state;
  }
}

// 계산기 상태 관리 훅
export const useCalculatorState = () => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const { calculate } = useCalculator();

  // 계산 실행을 위한 향상된 액션들
  const performCalculation = () => {
    const result = calculate(state.expression);
    dispatch({ type: 'CALCULATE', payload: { result } });
  };

  return {
    state,
    dispatch,
    actions: {
      inputNumber: (num: string) => dispatch({ type: 'INPUT_NUMBER', payload: num }),
      inputOperator: (op: '+' | '-' | '×' | '÷') => dispatch({ type: 'INPUT_OPERATOR', payload: op }),
      inputDecimal: () => dispatch({ type: 'INPUT_DECIMAL' }),
      calculate: performCalculation,
      clear: () => dispatch({ type: 'CLEAR' }),
      backspace: () => dispatch({ type: 'BACKSPACE' }),
      toggleSign: () => dispatch({ type: 'TOGGLE_SIGN' }),
      percentage: () => dispatch({ type: 'PERCENTAGE' }),
    },
  };
};
