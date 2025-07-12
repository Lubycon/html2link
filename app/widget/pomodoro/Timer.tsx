'use client';

import { useMemo } from 'react';

interface Props {
  size: number;
  seconds: number;
  totalSeconds: number;
}
export default function Timer({ size, seconds, totalSeconds }: Props) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  const center = size / 2;
  const radius = center - 32;
  const handLength = radius - 8;
  const angle = getHandAngle(seconds, totalSeconds);
  const handAngle = angle - 90;
  const rad = (handAngle * Math.PI) / 180;
  const handX = center + handLength * Math.cos(rad);
  const handY = center + handLength * Math.sin(rad);
  const arcPath = getArcPath(center, center, radius, angle);

  const ticks = useMemo(() => generateTicks(center, radius), [center, radius]);

  return (
    <svg width={size} height={size} style={{ display: 'block', background: '#fff', borderRadius: '50%' }}>
      <title>Pomodoro Timer Dial</title>
      <circle cx={center} cy={center} r={radius} fill="#fff" stroke="#f8fafc" strokeWidth="2" />
      <path d={arcPath} stroke="#e74c3c" strokeWidth="24" fill="none" />
      {ticks}
      <line x1={center} y1={center} x2={handX} y2={handY} stroke="#e74c3c" strokeWidth="6" strokeLinecap="round" />
      <circle cx={center} cy={center} r="14" fill="#fff" />
      <circle cx={center} cy={center} r="8" fill="#e74c3c" />
      <text x={center} y={center + 60} textAnchor="middle" fontSize="32" fill="#222" fontFamily="sans-serif">
        {minutes}:{secs}
      </text>
    </svg>
  );
}

function getHandAngle(seconds: number, total: number) {
  return (360 * (total - seconds)) / total;
}

function getArcPath(cx: number, cy: number, r: number, angle: number) {
  const start = {
    x: cx,
    y: cy - r,
  };
  const end = {
    x: cx + r * Math.sin((angle * Math.PI) / 180),
    y: cy - r * Math.cos((angle * Math.PI) / 180),
  };
  const largeArc = angle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

function generateTicks(center: number, radius: number) {
  const arr = [];
  for (let i = 0; i < 60; i++) {
    const tickAngle = (i * 360) / 60 - 90;
    const tickRad = (tickAngle * Math.PI) / 180;
    const outer = {
      x: center + radius * Math.cos(tickRad),
      y: center + radius * Math.sin(tickRad),
    };
    const inner = {
      x: center + (radius - (i % 5 === 0 ? 16 : 8)) * Math.cos(tickRad),
      y: center + (radius - (i % 5 === 0 ? 16 : 8)) * Math.sin(tickRad),
    };
    arr.push(
      <line
        key={i}
        x1={outer.x}
        y1={outer.y}
        x2={inner.x}
        y2={inner.y}
        stroke="#222"
        strokeWidth={i % 5 === 0 ? 3 : 1}
      />,
    );
  }

  return arr;
}
