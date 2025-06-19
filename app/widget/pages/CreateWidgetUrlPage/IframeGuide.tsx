function IframeGuide() {
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 24, textAlign: 'center' }}>
        If you&apos;re new to Linkify, please use this link to continue in a new window!
      </div>
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
          marginBottom: 24,
          fontWeight: 600,
          maxWidth: 320,
        }}
        onClick={() => window.open('https://html2link.lubycon.io', '_blank', 'noopener,noreferrer')}
      >
        Open Linkify in New Window
      </button>
    </main>
  );
}

export default IframeGuide;
