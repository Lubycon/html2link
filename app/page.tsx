'use client';

import { useState } from 'react';

export default function Home() {
  const [htmlCode, setHtmlCode] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');

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
        onClick={async () => {
          const res = await fetch('/api/embed', {
            method: 'POST',
            body: JSON.stringify({ html: htmlCode }),
          });

          const data = await res.json();
          setEmbedUrl(data.url);
        }}
        style={{
          width: '100%',
          height: 50,
          fontSize: 20,
        }}
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
          </div>
        </div>
      )}
    </main>
  );
}
