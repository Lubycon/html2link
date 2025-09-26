'use client';

import { OverlayProvider } from 'overlay-kit';
import { useEffect } from 'react';
import { initAmplitude } from './utils/amplitude';

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAmplitude();
  }, []);

  return <OverlayProvider>{children}</OverlayProvider>;
}
