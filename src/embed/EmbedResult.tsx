import { clipboard } from '@/utils/clipboard';

interface Props {
  url: string;
}

export default function EmbedResult({ url }: Props) {
  return (
    <div
      style={{
        marginTop: '32px',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '3px',
        border: '1px solid #e9e9e9',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
        🔄 Your file has been uploaded. GitHub Pages may still be updating.
      </p>
      <p
        style={{
          color: '#787774',
          fontSize: '13px',
          marginBottom: '16px',
          lineHeight: '1.5',
        }}
      >
        If the URL below doesn&apos;t work after a minute, please try again.
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
          ✅ Embed the URL below in Notion:
        </p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{
            textDecoration: 'none',
            color: '#37352f',
          }}
        >
          <pre
            aria-live="polite"
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
            {url}
          </pre>
        </a>
        <button
          type="button"
          onClick={() => {
            clipboard.writeText(url);
            alert('URL copied to clipboard.');
          }}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#0064FF',
            border: 'none',
            borderRadius: '3px',
            fontSize: '13px',
            fontWeight: '500',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
}
