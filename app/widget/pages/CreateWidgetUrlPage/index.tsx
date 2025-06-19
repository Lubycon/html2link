'use client';

import { useAuth } from 'app/common/AuthContext';
import { isIframe } from 'app/utils/env';
import Image from 'next/image';
import { useState } from 'react';
import Avatar from './Avatar';
import EmbedResult from './EmbedUrlResult';
import HTMLInput from './HTMLInput';
import IframeGuide from './IframeGuide';

export default function CreateWidgetUrlPage() {
  const [embedUrl, setEmbedUrl] = useState('');
  const { user, logout } = useAuth();
  const avatarUrl = user?.user_metadata?.avatar_url ?? 'https://www.gravatar.com/avatar/?d=identicon';

  if (user == null && isIframe()) {
    return <IframeGuide />;
  }

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
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, position: 'relative' }}>
        <Image src="/linkify-logo.png" alt="Linkify" width={28} height={28} />
        <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: -1 }}>Linkify</span>
        <span style={{ color: '#0064FF', fontWeight: 500, fontSize: 14, marginLeft: 8 }}>for Notion</span>
        <div style={{ flex: 1 }} />
        {user && <Avatar avatarUrl={avatarUrl} onClick={logout} />}
      </div>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        <HTMLInput onConvert={setEmbedUrl} />
        {embedUrl && <EmbedResult url={embedUrl} />}
      </div>
    </main>
  );
}
