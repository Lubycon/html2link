'use client';

import Link from 'next/link';

const WIDGETS = [
  {
    name: 'FlipClock',
    description: '미니멀하고 미려한 플립 시계 위젯',
    views: 417000,
    link: '/widget/flip-clock',
  },
  {
    name: 'Create Your Widget',
    description: 'HTML 코드로 위젯 링크를 생성하세요',
    views: 732000,
    link: '/widget/create-widget-link',
  },
];

export default function LinkifyMain() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '24px 40px 12px 40px',
          background: '#fff',
          boxShadow: '0 2px 8px #0001',
        }}
      >
        <span style={{ fontWeight: 900, fontSize: 28, color: '#2d72d9', letterSpacing: -1 }}>🖼️ Apption</span>
        <nav style={{ marginLeft: 'auto', display: 'flex', gap: 24 }}>
          <Link href="/" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>
            로그인
          </Link>
        </nav>
      </header>
      <main
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 32,
          maxWidth: 1200,
          margin: '0 auto 60px auto',
        }}
      >
        {WIDGETS.map((w) => (
          <div
            key={w.name}
            style={{
              background: '#fff',
              borderRadius: 18,
              boxShadow: '0 2px 16px #0001',
              width: 260,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'box-shadow 0.2s',
              minHeight: 320,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>{w.name}</div>
            <div style={{ color: '#555', fontSize: 16, marginBottom: 16, textAlign: 'center' }}>{w.description}</div>
            <div style={{ color: '#888', fontSize: 14 }}>조회수 {w.views.toLocaleString()}회</div>
          </div>
        ))}
      </main>
      {/* 푸터 */}
      <footer
        style={{
          textAlign: 'center',
          color: '#888',
          fontSize: 15,
          padding: '32px 0 18px 0',
          borderTop: '1px solid #eee',
          background: '#fafbfc',
        }}
      >
        <div style={{ marginBottom: 8 }}>© {new Date().getFullYear()} Apption. 모든 권리 보유.</div>
        <div>
          <Link href="/" style={{ color: '#888', marginRight: 16 }}>
            이용약관
          </Link>
          <Link href="/" style={{ color: '#888' }}>
            개인정보처리방침
          </Link>
        </div>
      </footer>
    </div>
  );
}
