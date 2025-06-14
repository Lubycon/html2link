import GoogleLoginModal from '@/auth/GoogleLogInModal';
import { supabase } from '@/supabase';
import type { User } from '@supabase/supabase-js';
import { overlay } from 'overlay-kit';
import { createContext, useContext, useState } from 'react';
import { useAsyncEffect } from 'react-simplikit';

interface AuthContextValue {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useAsyncEffect(async () => {
    const user = (await supabase.auth.getUser()).data.user;
    setUser(user);

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const login = () => overlay.open(({ isOpen, close }) => <GoogleLoginModal open={isOpen} onClose={close} />);
  const logout = () => {
    supabase.auth.signOut();
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
