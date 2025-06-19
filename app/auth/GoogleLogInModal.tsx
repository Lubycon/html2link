'use client';

import { supabase } from 'app/supabase';
import { trackEvent } from 'app/utils/amplitude';
import { getHost } from 'app/utils/env';
import { useEffect, useState } from 'react';

export default function GoogleLoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      trackEvent('Impression Google Login Modal');
    } else {
      setVisible(false);
    }
  }, [open]);

  if (!open && !visible) {
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
        transition: 'background 0.3s',
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '32px',
          borderRadius: 10,
          minWidth: 320,
          textAlign: 'center',
          border: '1px solid #e9e9e9',
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: '#37352f',
          opacity: open ? 1 : 0,
          transform: open ? 'scale(1)' : 'scale(0.96)',
          transition: 'opacity 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1)',
        }}
      >
        <h2
          style={{
            color: '#37352f',
            fontSize: '18px',
            fontWeight: 700,
            marginBottom: '18px',
            letterSpacing: '-0.5px',
          }}
        >
          Tell us who you are to create your widget
        </h2>
        <button
          type="button"
          style={{
            width: '100%',
            height: 52,
            fontSize: 16,
            color: '#222',
            backgroundColor: '#D5E7F2',
            border: '1px solid #b5c9d3',
            borderRadius: 10,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            transition: 'background 0.2s',
            letterSpacing: '0.5px',
            marginBottom: 12,
          }}
          onClick={async () => {
            trackEvent('Click Google Login Modal Button', { payload: true });
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: getHost(),
              },
            });
            if (error) {
              alert(error.message);
            }
          }}
        >
          Log in with Google
        </button>
        <div style={{ marginTop: '10px' }}>
          <button
            type="button"
            onClick={() => {
              trackEvent('Click Google Login Modal Button', { payload: false });
              onClose();
            }}
            style={{
              color: '#787774',
              background: 'none',
              border: 'none',
              fontSize: '14px',
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: 6,
              transition: 'background-color 0.2s',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
