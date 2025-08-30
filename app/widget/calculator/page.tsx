'use client';

import { useCalculatorKeyboard } from './useCalculatorKeyboard';
import { useCalculatorState } from './useCalculatorState';
import './calculator.css';

export default function Calculator() {
  const { state, actions } = useCalculatorState();

  // 키보드 입력 처리
  useCalculatorKeyboard(actions, [state]);

  // 디스플레이에 표시할 텍스트 결정
  const displayText = state.showResult ? state.display : state.expression || state.display;

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="keyboard-hint">키보드 사용: 숫자, +, -, *, /, Enter(=), Escape(AC), Backspace, %(퍼센트)</div>
        <div className="calculator-display">
          <span className="display-text">{displayText}</span>
        </div>

        <div className="calculator-keypad">
          <div className="button-row">
            <button type="button" className="calculator-button function" onClick={actions.clear}>
              AC
            </button>
            <button type="button" className="calculator-button function" onClick={actions.toggleSign}>
              ±
            </button>
            <button type="button" className="calculator-button function" onClick={actions.percentage}>
              %
            </button>
            <button type="button" className="calculator-button operator" onClick={() => actions.inputOperator('÷')}>
              ÷
            </button>
          </div>

          <div className="button-row">
            <button type="button" className="calculator-button number" onClick={() => actions.inputNumber('7')}>
              7
            </button>
            <button type="button" className="calculator-button number" onClick={() => actions.inputNumber('8')}>
              8
            </button>
            <button type="button" className="calculator-button number" onClick={() => actions.inputNumber('9')}>
              9
            </button>
            <button type="button" className="calculator-button operator" onClick={() => actions.inputOperator('×')}>
              ×
            </button>
          </div>

          <div className="button-row">
            <button type="button" className="calculator-button number" onClick={() => actions.inputNumber('4')}>
              4
            </button>
            <button type="button" className="calculator-button number" onClick={() => actions.inputNumber('5')}>
              5
            </button>
            <button type="button" className="calculator-button number" onClick={() => actions.inputNumber('6')}>
              6
            </button>
            <button type="button" className="calculator-button operator" onClick={() => actions.inputOperator('-')}>
              −
            </button>
          </div>

          <div className="button-row">
            <button type="button" className="calculator-button number" onClick={() => actions.inputNumber('1')}>
              1
            </button>
            <button type="button" className="calculator-button number" onClick={() => actions.inputNumber('2')}>
              2
            </button>
            <button type="button" className="calculator-button number" onClick={() => actions.inputNumber('3')}>
              3
            </button>
            <button type="button" className="calculator-button operator" onClick={() => actions.inputOperator('+')}>
              +
            </button>
          </div>

          <div className="button-row">
            <button type="button" className="calculator-button number zero" onClick={() => actions.inputNumber('0')}>
              0
            </button>
            <button type="button" className="calculator-button number" onClick={actions.inputDecimal}>
              .
            </button>
            <button type="button" className="calculator-button operator equals" onClick={actions.calculate}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
