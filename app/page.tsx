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
    <main>
      <h1>🧩 노션 HTML 임베드 변환기</h1>
      <textarea
        placeholder="HTML 코드를 입력하세요"
        value={htmlCode}
        onChange={(e) => setHtmlCode(e.target.value)}
        style={{
          width: '100%',
          height: 300,
          resize: 'none',
        }}
      />
      <button
        type="button"
        onClick={handleConvert}
        style={{
          width: '100%',
          height: 50,
          fontSize: 20,
        }}
        disabled={isEmptyString(htmlCode)}
      >
        변환하기
      </button>

      {embedUrl && (
        <div style={{ marginTop: 100 }}>
          <p>🔄 파일이 업로드되었으며, GitHub Pages가 업데이트 중일 수 있습니다.</p>
          <p>1분 후에도 아래 URL이 작동하지 않으면 다시 시도해 주세요.</p>
          <div>
            ✅ 아래 URL을 노션에 Embed하면 됩니다:
            <a href={embedUrl} target="_blank" rel="noreferrer">
              <pre>{embedUrl}</pre>
            </a>
            <button
              type="button"
              onClick={() => {
                clipboard.writeText(embedUrl);
                alert('URL이 복사되었어요.');
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
