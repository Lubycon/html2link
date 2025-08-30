import { useCallback } from 'react';

interface CalculatorResult {
  success: boolean;
  result?: number;
  error?: string;
}

/**
 * 안전한 수학 표현식 계산 훅
 * eval() 대신 안전한 파싱을 사용합니다.
 */
export const useCalculator = () => {
  const parseExpression = useCallback((expression: string): CalculatorResult => {
    try {
      // 허용된 문자만 포함하는지 검증
      const allowedChars = /^[0-9+\-×÷(). ]+$/;
      if (!allowedChars.test(expression)) {
        return { success: false, error: 'Invalid characters in expression' };
      }

      // 계산기 기호를 JavaScript 연산자로 변환
      const sanitizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/').trim();

      // 빈 표현식 처리
      if (!sanitizedExpression) {
        return { success: true, result: 0 };
      }

      // 연속된 연산자나 잘못된 패턴 체크
      if (
        /[+\-*/]{2,}/.test(sanitizedExpression) ||
        /^[+*/]/.test(sanitizedExpression) ||
        /[+\-*/]$/.test(sanitizedExpression)
      ) {
        return { success: false, error: 'Invalid operator sequence' };
      }

      // 간단한 수식 파서 (더 안전한 방법)
      const result = safeEvaluate(sanitizedExpression);

      if (Number.isNaN(result) || !Number.isFinite(result)) {
        return { success: false, error: 'Invalid calculation result' };
      }

      return { success: true, result };
    } catch {
      return { success: false, error: 'Calculation error' };
    }
  }, []);

  const calculate = useCallback(
    (expression: string): number | null => {
      const result = parseExpression(expression);
      return result.success && result.result !== undefined ? result.result : null;
    },
    [parseExpression],
  );

  const validateExpression = useCallback(
    (expression: string): boolean => {
      const result = parseExpression(expression);
      return result.success;
    },
    [parseExpression],
  );

  return {
    calculate,
    parseExpression,
    validateExpression,
  };
};

/**
 * 안전한 수학 표현식 평가 (재귀적 파싱)
 * eval() 없이 직접 파싱하여 계산
 */
function safeEvaluate(inputExpression: string): number {
  // 공백 제거
  let expression = inputExpression.replace(/\s+/g, '');

  // 괄호 처리
  while (expression.includes('(')) {
    const openIndex = expression.lastIndexOf('(');
    const closeIndex = expression.indexOf(')', openIndex);

    if (closeIndex === -1) {
      throw new Error('Mismatched parentheses');
    }

    const innerExpression = expression.slice(openIndex + 1, closeIndex);
    const innerResult = safeEvaluate(innerExpression);

    expression = expression.slice(0, openIndex) + innerResult + expression.slice(closeIndex + 1);
  }

  return evaluateSimpleExpression(expression);
}

/**
 * 괄호가 없는 간단한 표현식 평가
 * 연산자 우선순위를 고려하여 계산
 */
function evaluateSimpleExpression(inputExpression: string): number {
  // 곱셈과 나눗셈 먼저 처리
  const processedExpression = processMultiplicationDivision(inputExpression);

  // 덧셈과 뺄셈 처리
  return processAdditionSubtraction(processedExpression);
}

function processMultiplicationDivision(expression: string): string {
  const tokens = tokenize(expression);
  const result: (string | number)[] = [];

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === '*' && i > 0 && i < tokens.length - 1) {
      const left = Number(result.pop());
      const right = Number(tokens[i + 1]);
      result.push(left * right);
      i++; // 다음 토큰 건너뛰기
    } else if (tokens[i] === '/' && i > 0 && i < tokens.length - 1) {
      const left = Number(result.pop());
      const right = Number(tokens[i + 1]);
      if (right === 0) {
        throw new Error('Division by zero');
      }
      result.push(left / right);
      i++; // 다음 토큰 건너뛰기
    } else {
      result.push(tokens[i]);
    }
  }

  return result.join('');
}

function processAdditionSubtraction(expression: string): number {
  const tokens = tokenize(expression);
  let result = Number(tokens[0]);

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const operand = Number(tokens[i + 1]);

    if (operator === '+') {
      result += operand;
    } else if (operator === '-') {
      result -= operand;
    }
  }

  return result;
}

function tokenize(expression: string): string[] {
  const tokens: string[] = [];
  let currentNumber = '';

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (/[0-9.]/.test(char)) {
      currentNumber += char;
    } else if (/[+\-*/]/.test(char)) {
      if (currentNumber) {
        tokens.push(currentNumber);
        currentNumber = '';
      }

      // 음수 처리 (연산자 다음이나 시작 부분의 - 기호)
      if (char === '-' && (i === 0 || /[+\-*/]/.test(expression[i - 1]))) {
        currentNumber = '-';
      } else {
        tokens.push(char);
      }
    }
  }

  if (currentNumber) {
    tokens.push(currentNumber);
  }

  return tokens;
}
