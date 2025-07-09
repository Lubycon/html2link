import { useEffect, useState } from 'react';

function isColorDark(rgb: string): boolean {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match == null) {
    return false;
  }

  const r = Number.parseInt(match[1], 10);
  const g = Number.parseInt(match[2], 10);
  const b = Number.parseInt(match[3], 10);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness < 128;
}

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const getDarkByMedia = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
    const getDarkByBg = () => {
      const bg = window.getComputedStyle(document.body).backgroundColor;
      return isColorDark(bg);
    };
    return getDarkByMedia() || getDarkByBg();
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const getDarkByMedia = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
    const getDarkByBg = () => {
      const bg = window.getComputedStyle(document.body).backgroundColor;
      return isColorDark(bg);
    };
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setIsDark(getDarkByMedia() || getDarkByBg());

    setIsDark(getDarkByMedia() || getDarkByBg());
    mq.addEventListener('change', handler);

    const observer = new MutationObserver(() => {
      setIsDark(getDarkByMedia() || getDarkByBg());
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });

    return () => {
      mq.removeEventListener('change', handler);
      observer.disconnect();
    };
  }, []);

  return isDark;
}
