'use client';

import { useEffect, useState } from 'react';
import Flip from './Flip';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(getTimeParts());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex' }}>
        <Flip value={[clock.hours, clock.minutes, clock.seconds]} size="large" />
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignContent: 'flex-start', marginLeft: 8 }}>
          <div style={{ marginLeft: 2, fontFamily: 'Anton, sans-serif', fontSize: 18, margin: '9px 0 9px 2px' }}>
            {clock.timezone}
          </div>
          <Flip value={[clock.ampm]} size="medium" />
        </div>
      </div>
      <div style={{ fontWeight: 700, fontFamily: 'Anton, sans-serif', fontSize: 24, marginTop: 18 }}>
        {getDateString(clock.date)}
      </div>
    </div>
  );
};

export default Clock;
