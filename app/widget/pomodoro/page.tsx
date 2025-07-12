'use client';

import Timer from './Timer';
import { useTimer } from './useTimer';
import './page.css';

export default function PomodoroTimer() {
  const totalSeconds = 25 * 60;
  const { isRunning, seconds, start, pause, reset } = useTimer(totalSeconds);

  return (
    <div className="pomodoro-root">
      <div className="pomodoro-svg">
        <Timer size={320} seconds={seconds} totalSeconds={totalSeconds} />
      </div>
      {isRunning === true ? (
        <button type="button" onClick={pause} className="pomodoro-start">
          Pause
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
