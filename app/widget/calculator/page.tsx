'use client';

import { useEffect, useState } from 'react';
import './calculator.css';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(`${display}.`);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault();

      const key = event.key;

      // 숫자 입력
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      }
      // 연산자 입력
      else if (key === '+') {
        inputOperation('+');
      } else if (key === '-') {
        inputOperation('-');
      } else if (key === '*' || key === '×') {
        inputOperation('×');
      } else if (key === '/' || key === '÷') {
        inputOperation('÷');
      }
      // 기능 키
      else if (key === 'Enter' || key === '=') {
        performCalculation();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      } else if (key === '.' || key === ',') {
        inputDecimal();
      } else if (key === 'Backspace') {
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay('0');
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [display, previousValue, operation, waitingForOperand]);

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="keyboard-hint">키보드 사용: 숫자, +, -, *, /, Enter(=), Escape(AC), Backspace</div>
        <div className="calculator-display">
          <span className="display-text">{display}</span>
        </div>

        <div className="calculator-keypad">
          <div className="button-row">
            <button type="button" className="calculator-button function" onClick={clear}>
              AC
            </button>
            <button
              type="button"
              className="calculator-button function"
              onClick={() => setDisplay(String(-Number.parseFloat(display)))}
            >
              ±
            </button>
            <button
              type="button"
              className="calculator-button function"
              onClick={() => setDisplay(String(Number.parseFloat(display) / 100))}
            >
              %
            </button>
            <button type="button" className="calculator-button operator" onClick={() => inputOperation('÷')}>
              ÷
            </button>
          </div>

          <div className="button-row">
            <button type="button" className="calculator-button number" onClick={() => inputNumber('7')}>
              7
            </button>
            <button type="button" className="calculator-button number" onClick={() => inputNumber('8')}>
              8
            </button>
            <button type="button" className="calculator-button number" onClick={() => inputNumber('9')}>
              9
            </button>
            <button type="button" className="calculator-button operator" onClick={() => inputOperation('×')}>
              ×
            </button>
          </div>

          <div className="button-row">
            <button type="button" className="calculator-button number" onClick={() => inputNumber('4')}>
              4
            </button>
            <button type="button" className="calculator-button number" onClick={() => inputNumber('5')}>
              5
            </button>
            <button type="button" className="calculator-button number" onClick={() => inputNumber('6')}>
              6
            </button>
            <button type="button" className="calculator-button operator" onClick={() => inputOperation('-')}>
              −
            </button>
          </div>

          <div className="button-row">
            <button type="button" className="calculator-button number" onClick={() => inputNumber('1')}>
              1
            </button>
            <button type="button" className="calculator-button number" onClick={() => inputNumber('2')}>
              2
            </button>
            <button type="button" className="calculator-button number" onClick={() => inputNumber('3')}>
              3
            </button>
            <button type="button" className="calculator-button operator" onClick={() => inputOperation('+')}>
              +
            </button>
          </div>

          <div className="button-row">
            <button type="button" className="calculator-button number zero" onClick={() => inputNumber('0')}>
              0
            </button>
            <button type="button" className="calculator-button number" onClick={inputDecimal}>
              .
            </button>
            <button type="button" className="calculator-button operator equals" onClick={performCalculation}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
