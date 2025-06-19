'use client';

import { OverlayProvider } from 'overlay-kit';
import { AuthProvider } from './common/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <OverlayProvider>{children}</OverlayProvider>
    </AuthProvider>
  );
}
