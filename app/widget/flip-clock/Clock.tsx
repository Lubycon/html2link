'use client';

import { useEffect, useRef, useState } from 'react';
import { useInterval } from 'react-simplikit';
import Flip from './Flip';
import './Clock.css';
import { useDarkMode } from 'app/utils/hooks/useDarkMode';

function getTimeParts() {
  const now = new Date();
  const rawHours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = rawHours >= 12 ? 'PM' : 'AM';
  const hours12 = rawHours % 12 === 0 ? 12 : rawHours % 12;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return {
    hours: pad(hours12),
    minutes: pad(minutes),
    seconds: pad(seconds),
    ampm,
    date: new Date(now.getTime()),
    timezone,
  };
}

function getDateString(date: Date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${days[date.getDay()]} | ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

const Clock = () => {
  const [clock, setClock] = useState(getTimeParts());
  const isDarkMode = useDarkMode();
  const rootRef = useRef<HTMLDivElement>(null);

  useInterval(() => {
    setClock(getTimeParts());
  }, 1000);

  useEffect(() => {
    const root = rootRef.current;
    if (root == null) {
      return;
    }

    if (isDarkMode) {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="clock-root" ref={rootRef}>
      <div className="clock-row">
        <Flip value={[clock.hours, clock.minutes, clock.seconds]} size="lg" />
        <div className="clock-meta">
          <div className="clock-timezone">{clock.timezone}</div>
          <Flip value={[clock.ampm]} />
        </div>
      </div>
      <div className="clock-date">{getDateString(clock.date)}</div>
    </div>
  );
};

export default Clock;
