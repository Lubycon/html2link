'use client';

import Header from '@/common/Header';
import { useState } from 'react';
import EmbedResult from './EmbedUrlResult';
import HTMLInput from './HTMLInput';

export default function CreateWidgetUrlPage() {
  const [embedUrl, setEmbedUrl] = useState('');

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
      <Header />
      <div style={{ marginTop: '80px' }}>
        <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
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
            🧩 Notion HTML Embed Converter
          </h1>
          <HTMLInput onConvert={setEmbedUrl} />
          {embedUrl && <EmbedResult url={embedUrl} />}
        </div>
      </div>
    </main>
  );
}
