import { clipboard } from 'app/utils/clipboard';

interface Props {
  url: string;
}

export default function EmbedUrlResult({ url }: Props) {
  return (
    <div
      style={{
        marginTop: 24,
        padding: 20,
        background: '#f7f6f3',
        borderRadius: 6,
        border: '1px solid #e9e9e9',
        fontSize: 15,
        color: '#37352f',
      }}
    >
      <div style={{ marginBottom: 12, color: '#787774', fontSize: 14 }}>
        <span role="img" aria-label="success">
          ✅
        </span>{' '}
        Your Notion embed link is ready!
        <br />
        Paste this link into Notion and watch the magic happen ✨
      </div>
      <div
        style={{
          background: '#fff',
          border: '1px solid #e9e9e9',
          borderRadius: 4,
          padding: 12,
          fontFamily: 'monospace',
          fontSize: 14,
          wordBreak: 'break-all',
          marginBottom: 8,
        }}
      >
        {url}
      </div>
      <button
        type="button"
        onClick={() => {
          clipboard.writeText(url);
          alert('Link copied!');
        }}
        style={{
          background: '#fff',
          color: '#222',
          border: '1px solid #b5c9d3',
          borderRadius: 10,
          fontSize: 14,
          cursor: 'pointer',
          marginTop: 8,
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          transition: 'background 0.2s',
        }}
      >
        Copy Link
      </button>
    </div>
  );
}
