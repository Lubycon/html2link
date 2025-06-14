'use client';

import { supabase } from 'src/supabase';

export default function GoogleLoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: 'white',
          padding: 30,
          borderRadius: 8,
          minWidth: 280,
          textAlign: 'center',
        }}
      >
        <h2>로그인이 필요합니다</h2>
        <button
          type="button"
          style={{
            marginTop: 20,
            padding: '8px 20px',
            fontSize: 18,
            background: '#4285F4',
            color: 'white',
            borderRadius: 4,
          }}
          onClick={async () => {
            const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
            if (error) {
              alert(error.message);
            }
          }}
        >
          Google 계정으로 로그인
        </button>
        <div style={{ marginTop: 18 }}>
          <button type="button" onClick={onClose} style={{ color: '#888' }}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
