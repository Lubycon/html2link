'use client';

import { clipboard } from '@/utils/clipboard';
import { isEmptyString } from '@/utils/isEmptyString';
import type { User } from '@supabase/supabase-js';
import { overlay } from 'overlay-kit';
import { useEffect, useState } from 'react';
import GoogleLoginModal from 'src/auth/GoogleLogInModal';
import { supabase } from 'src/supabase';

export default function Home() {
  const [htmlCode, setHtmlCode] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    overlay.open(({ isOpen, close }) => <GoogleLoginModal open={isOpen} onClose={close} />);
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
        backgroundColor: '#111',
        minHeight: '100vh',
        color: '#e0e0e0',
      }}
    >
      <h1
        style={{
          fontSize: '24px',
          textAlign: 'center',
          marginBottom: '24px',
          color: '#fff',
          fontWeight: '500',
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
          borderRadius: '4px',
          border: '1px solid #333',
          fontSize: '14px',
          backgroundColor: '#1a1a1a',
          color: '#e0e0e0',
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
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
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
            backgroundColor: '#1a1a1a',
            borderRadius: '4px',
            border: '1px solid #333',
          }}
        >
          <p
            style={{
              color: '#999',
              fontSize: '13px',
              marginBottom: '8px',
              lineHeight: '1.5',
            }}
          >
            🔄 파일이 업로드되었으며, GitHub Pages가 업데이트 중일 수 있습니다.
          </p>
          <p
            style={{
              color: '#999',
              fontSize: '13px',
              marginBottom: '16px',
              lineHeight: '1.5',
            }}
          >
            1분 후에도 아래 URL이 작동하지 않으면 다시 시도해 주세요.
          </p>
          <div
            style={{
              backgroundColor: '#222',
              padding: '16px',
              borderRadius: '4px',
              border: '1px solid #333',
            }}
          >
            <p
              style={{
                color: '#fff',
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
                color: '#fff',
              }}
            >
              <pre
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  fontSize: '13px',
                  backgroundColor: '#1a1a1a',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #333',
                  marginBottom: '12px',
                  color: '#e0e0e0',
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
                backgroundColor: '#333',
                border: 'none',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '500',
                color: '#fff',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              복사하기
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
