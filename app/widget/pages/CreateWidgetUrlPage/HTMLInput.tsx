import { useAuth } from 'app/common/AuthContext';
import { trackEvent } from 'app/utils/amplitude';
import { isEmptyString } from 'app/utils/isEmptyString';
import { validateHTML } from 'app/utils/validateHTML';
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
    const [validationResult, validationMessage] = validateHTML(htmlCode);
    if (validationResult === false) {
      setError(validationMessage);
      return;
    }

    if (!user) {
      login();
      return;
    }

    // Amplitude 이벤트 트래킹
    trackEvent('Submit Widget HTML');

    const res = await startLoading(
      fetch('/api/widgets', {
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
        placeholder="Paste your HTML code here"
        value={htmlCode}
        onChange={(e) => setHtmlCode(e.target.value)}
        style={{
          width: '100%',
          minHeight: 120,
          border: '1px solid #e9e9e9',
          borderRadius: 6,
          padding: 16,
          fontSize: 15,
          background: '#fff',
          color: '#37352f',
          marginBottom: 16,
          boxSizing: 'border-box',
          resize: 'none',
          outline: 'none',
        }}
      />
      <button
        type="button"
        onClick={handleConvert}
        style={{
          width: '100%',
          height: 52,
          fontSize: 16,
          color: '#222',
          backgroundColor: '#D5E7F2',
          border: '1px solid #b5c9d3',
          borderRadius: 10,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          transition: 'background 0.2s',
          opacity: isLoading ? '0.7' : isEmptyString(htmlCode) ? '0.5' : '1',
          letterSpacing: '0.5px',
          marginBottom: 24,
        }}
        disabled={isEmptyString(htmlCode) || isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner" aria-hidden="true" /> Converting...
          </>
        ) : (
          <>Get Your Widget Link</>
        )}
      </button>
    </>
  );
}
