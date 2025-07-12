'use client';

import { useRef } from 'react';
import Quotes from './Quotes';
import quotes from './data.json';

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export default function QuotesPage() {
  const quote = useRef(getRandomQuote());

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Quotes contents={quote.current.contents} author={quote.current.author} />
    </div>
  );
}
