import { useEffect, useRef, useState } from 'react';

export function useTimer(totalSeconds: number) {
  const [seconds, setSeconds] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSeconds(totalSeconds);
    setIsRunning(false);
  }, [totalSeconds]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setSeconds(totalSeconds);
  };

  return {
    isRunning,
    seconds,
    totalSeconds,
    start,
    pause,
    reset,
  };
}
