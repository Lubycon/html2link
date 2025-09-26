'use client';

import { useState } from 'react';
import EmbedResult from './EmbedUrlResult';
import HTMLInput from './HTMLInput';

export default function CreateWidgetUrlPage() {
  const [embedUrl, setEmbedUrl] = useState('');

  return (
    <main
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#37352f',
        background: '#fff',
        padding: '32px',
        border: '1px solid #e9e9e9',
        borderRadius: 10,
      }}
    >
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <HTMLInput onConvert={setEmbedUrl} />
        {embedUrl && <EmbedResult url={embedUrl} />}
      </div>
    </main>
  );
}
