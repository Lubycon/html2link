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
    <svg width={size} height={size} style={{ display: 'block' }}>
      <title>Pomodoro Timer Dial</title>
      <circle cx={center} cy={center} r={radius} fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      <path d={arcPath} stroke="#e53e3e" strokeWidth="6" fill="none" strokeLinecap="round" />
      {ticks}
      <line x1={center} y1={center} x2={handX} y2={handY} stroke="#e53e3e" strokeWidth="3" strokeLinecap="round" />
      <circle cx={center} cy={center} r="6" fill="#fff" stroke="#e53e3e" strokeWidth="2" />
      <text x={center} y={center + 8} textAnchor="middle" fontSize="36" fill="#2d3748" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600">
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
  for (let i = 0; i < 12; i++) {
    const tickAngle = (i * 360) / 12 - 90;
    const tickRad = (tickAngle * Math.PI) / 180;
    const outer = {
      x: center + (radius - 8) * Math.cos(tickRad),
      y: center + (radius - 8) * Math.sin(tickRad),
    };
    const inner = {
      x: center + (radius - 20) * Math.cos(tickRad),
      y: center + (radius - 20) * Math.sin(tickRad),
    };
    arr.push(
      <line
        key={i}
        x1={outer.x}
        y1={outer.y}
        x2={inner.x}
        y2={inner.y}
        stroke="#cbd5e0"
        strokeWidth={2}
        strokeLinecap="round"
      />,
    );
  }

  return arr;
}
