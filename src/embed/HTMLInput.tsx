import { useAuth } from '@/common/AuthContext';
import { isEmptyString } from '@/utils/isEmptyString';
import { useState } from 'react';
import { useLoading } from 'react-simplikit';

interface Props {
  onConvert: (resultUrl: string) => void;
}
export default function HTMLInput({ onConvert }: Props) {
  const { user, login } = useAuth();

  const [isLoading, startLoading] = useLoading();
  const [htmlCode, setHtmlCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    setError(null);
    if (!user) {
      login();
      return;
    }

    const res = await startLoading(
      fetch('/api/embed', {
        method: 'POST',
        body: JSON.stringify({ html: htmlCode }),
      }),
    );

    const data = await res.json();
    if (data.error != null) {
      setError(data.error);
      return;
    }

    onConvert(data.url);
  };

  return (
    <>
      {error && (
        <div
          role="alert"
          style={{
            backgroundColor: '#ffe6e6',
            color: '#d32f2f',
            padding: '12px',
            borderRadius: '3px',
            marginBottom: '16px',
          }}
        >
          ⚠️ {error}
        </div>
      )}
      <textarea
        placeholder="Enter your HTML code here"
        value={htmlCode}
        onChange={(e) => setHtmlCode(e.target.value)}
        style={{
          width: '100%',
          height: 200,
          resize: 'none',
          padding: '16px',
          borderRadius: '3px',
          border: '1px solid #e9e9e9',
          fontSize: '14px',
          backgroundColor: '#ffffff',
          color: '#37352f',
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
          backgroundColor: '#0064FF',
          color: '#ffffff',
          border: 'none',
          borderRadius: '3px',
          fontWeight: '500',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          opacity: isLoading ? '0.7' : isEmptyString(htmlCode) ? '0.5' : '1',
          letterSpacing: '0.5px',
        }}
        disabled={isEmptyString(htmlCode) || isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner" aria-hidden="true" /> Converting...
          </>
        ) : (
          'Convert'
        )}
      </button>
    </>
  );
}
