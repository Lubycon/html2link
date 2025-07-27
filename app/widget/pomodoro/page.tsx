'use client';

import Timer from './Timer';
import { useTimer } from './useTimer';
import './page.css';
import { useState } from 'react';

export default function PomodoroTimer() {
  const [inputMinutes, setInputMinutes] = useState(25);
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const { isRunning, seconds, start, pause, reset } = useTimer(totalSeconds);

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value));
    setInputMinutes(value);
    setTotalSeconds(value * 60);
    reset();
  };

  return (
    <div className="pomodoro-container">
      <div className="timer-settings">
        <label htmlFor="pomodoro-minutes" className="minutes-label">
          Minutes:
        </label>
        <input
          id="pomodoro-minutes"
          type="number"
          min={1}
          value={inputMinutes}
          onChange={handleMinutesChange}
          className="minutes-input"
          disabled={isRunning}
        />
      </div>

      <div className="pomodoro-svg">
        <Timer size={280} seconds={seconds} totalSeconds={totalSeconds} />
      </div>

      {isRunning === true ? (
        <button type="button" onClick={pause} className="pomodoro-start">
          PAUSE SESSION
        </button>
      ) : (
        <button type="button" onClick={start} className="pomodoro-start">
          START SESSION
        </button>
      )}

      <div className="pomodoro-actions">
        <button type="button" onClick={reset} className="pomodoro-action">
          Reset
        </button>
      </div>
    </div>
  );
}
