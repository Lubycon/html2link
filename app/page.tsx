'use client';

import { clipboard } from '@/utils/clipboard';
import { isEmptyString } from '@/utils/isEmptyString';
import type { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { overlay } from 'overlay-kit';
import { useEffect, useState } from 'react';
import GoogleLoginModal from 'src/auth/GoogleLogInModal';
import { supabase } from 'src/supabase';

export default function Home() {
  const [htmlCode, setHtmlCode] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const login = () => {
    overlay.open(({ isOpen, close }) => <GoogleLoginModal open={isOpen} onClose={close} />);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowMenu(false);
  };

  const handleConvert = async () => {
    if (!user) {
      login();
      return;
    }

    const res = await fetch('/api/embed', {
      method: 'POST',
      body: JSON.stringify({ html: htmlCode }),
    });

    const data = await res.json();
    if (data.error != null) {
      alert(data.error);
      return;
    }

    alert('따끈따끈한 URL이 구워졌어요');
    setEmbedUrl(data.url);
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  return (
    <main
      style={{
        maxWidth: '100%',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        color: '#37352f',
      }}
    >
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
        {user ? (
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
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
                style={{
                  objectFit: 'cover',
                }}
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
                  onClick={handleLogout}
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
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={login}
            style={{
              padding: '6px 12px',
              fontSize: '14px',
              backgroundColor: '#ffffff',
              color: '#37352f',
              border: '1px solid #e9e9e9',
              borderRadius: '3px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            로그인
          </button>
        )}
      </div>
      <div style={{ marginTop: '80px' }}>
        <h1
          style={{
            fontSize: '24px',
            textAlign: 'center',
            marginBottom: '24px',
            color: '#37352f',
            fontWeight: '600',
            letterSpacing: '-0.5px',
          }}
        >
          🧩 노션 HTML 임베드 변환기
        </h1>
        <textarea
          placeholder="HTML 코드를 입력하세요"
          value={htmlCode}
          onChange={(e) => setHtmlCode(e.target.value)}
          style={{
            width: '100%',
            height: 200,
            resize: 'none',
            padding: '16px',
            borderRadius: '3px',
            border: '1px solid #e9e9e9',
            fontSize: '14px',
            backgroundColor: '#ffffff',
            color: '#37352f',
            boxShadow: 'none',
            marginBottom: '16px',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
        />
        <button
          type="button"
          onClick={handleConvert}
          style={{
            width: '100%',
            height: 48,
            fontSize: '14px',
            backgroundColor: '#ffffff',
            color: '#37352f',
            border: '1px solid #e9e9e9',
            borderRadius: '3px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
            opacity: isEmptyString(htmlCode) ? '0.5' : '1',
            letterSpacing: '0.5px',
          }}
          disabled={isEmptyString(htmlCode)}
        >
          변환하기
        </button>

        {embedUrl && (
          <div
            style={{
              marginTop: '32px',
              padding: '20px',
              backgroundColor: '#ffffff',
              borderRadius: '3px',
              border: '1px solid #e9e9e9',
            }}
          >
            <p
              style={{
                color: '#787774',
                fontSize: '13px',
                marginBottom: '8px',
                lineHeight: '1.5',
              }}
            >
              🔄 파일이 업로드되었으며, GitHub Pages가 업데이트 중일 수 있습니다.
            </p>
            <p
              style={{
                color: '#787774',
                fontSize: '13px',
                marginBottom: '16px',
                lineHeight: '1.5',
              }}
            >
              1분 후에도 아래 URL이 작동하지 않으면 다시 시도해 주세요.
            </p>
            <div
              style={{
                backgroundColor: '#f7f6f3',
                padding: '16px',
                borderRadius: '3px',
                border: '1px solid #e9e9e9',
              }}
            >
              <p
                style={{
                  color: '#37352f',
                  fontSize: '13px',
                  marginBottom: '12px',
                  fontWeight: '500',
                }}
              >
                ✅ 아래 URL을 노션에 Embed하면 됩니다:
              </p>
              <a
                href={embedUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'none',
                  color: '#37352f',
                }}
              >
                <pre
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    fontSize: '13px',
                    backgroundColor: '#ffffff',
                    padding: '12px',
                    borderRadius: '3px',
                    border: '1px solid #e9e9e9',
                    marginBottom: '12px',
                    color: '#37352f',
                  }}
                >
                  {embedUrl}
                </pre>
              </a>
              <button
                type="button"
                onClick={() => {
                  clipboard.writeText(embedUrl);
                  alert('URL이 복사되었어요.');
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e9e9e9',
                  borderRadius: '3px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#37352f',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                복사하기
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
