import { useKeydown } from '../../common/useKeydown';

interface CalculatorActions {
  inputNumber: (num: string) => void;
  inputOperator: (op: '+' | '-' | '×' | '÷') => void;
  inputDecimal: () => void;
  calculate: () => void;
  clear: () => void;
  backspace: () => void;
  toggleSign: () => void;
  percentage: () => void;
}

/**
 * 키보드 입력을 계산기 액션으로 매핑하는 훅
 */
export const useCalculatorKeyboard = (actions: CalculatorActions, deps: React.DependencyList) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;

    // 숫자 입력
    if (key >= '0' && key <= '9') {
      actions.inputNumber(key);
    }
    // 연산자 입력
    else if (key === '+') {
      actions.inputOperator('+');
    } else if (key === '-') {
      actions.inputOperator('-');
    } else if (key === '*' || key === '×') {
      actions.inputOperator('×');
    } else if (key === '/' || key === '÷') {
      actions.inputOperator('÷');
    }
    // 기능 키
    else if (key === 'Enter' || key === '=') {
      actions.calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      actions.clear();
    } else if (key === '.' || key === ',') {
      actions.inputDecimal();
    } else if (key === 'Backspace') {
      actions.backspace();
    }
    // 추가 기능
    else if (key === '%') {
      actions.percentage();
    }
  };

  useKeydown(handleKeyPress, deps);
};
