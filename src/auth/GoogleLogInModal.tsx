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
          background: '#ffffff',
          padding: '24px',
          borderRadius: '3px',
          minWidth: '280px',
          textAlign: 'center',
          border: '1px solid #e9e9e9',
        }}
      >
        <h2
          style={{
            color: '#37352f',
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '16px',
          }}
        >
          로그인이 필요합니다
        </h2>
        <button
          type="button"
          style={{
            width: '100%',
            padding: '8px 16px',
            fontSize: '14px',
            background: '#ffffff',
            color: '#37352f',
            border: '1px solid #e9e9e9',
            borderRadius: '3px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
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
        <div style={{ marginTop: '16px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              color: '#787774',
              background: 'none',
              border: 'none',
              fontSize: '13px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '3px',
              transition: 'background-color 0.2s',
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
