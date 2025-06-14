'use client';

import { useAuth } from '@/common/AuthContext';
import Image from 'next/image';
import { useRef } from 'react';
import { useBooleanState, useOutsideClickEffect } from 'react-simplikit';

export default function Header() {
  const [showMenu, openMenu, closeMenu] = useBooleanState(false);
  const { user, logout } = useAuth();

  const menuRef = useRef<HTMLDivElement>(null);
  useOutsideClickEffect(menuRef.current, () => {
    closeMenu();
  });

  if (user == null) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e9e9e9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 20px',
        zIndex: 100,
      }}
    >
      <div style={{ position: 'relative' }} ref={menuRef}>
        <button
          type="button"
          onClick={openMenu}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            borderRadius: '50%',
            overflow: 'hidden',
            width: '36px',
            height: '36px',
          }}
        >
          <Image
            src={user.user_metadata?.avatar_url ?? '/default-avatar.svg'}
            alt="Profile"
            width={36}
            height={36}
            style={{ objectFit: 'cover' }}
          />
        </button>
        {showMenu && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '8px',
              backgroundColor: '#ffffff',
              border: '1px solid #e9e9e9',
              borderRadius: '3px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              minWidth: '160px',
            }}
          >
            <button
              type="button"
              onClick={logout}
              style={{
                width: '100%',
                padding: '8px 16px',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: '#37352f',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
