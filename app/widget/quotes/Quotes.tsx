'use client';

import './Quotes.css';

interface Props {
  contents: string;
  author: string;
}

export default function Quotes({ contents, author }: Props) {
  return (
    <div className="quote-box">
      <div className="quote-contents">{contents}</div>
      <div className="quote-author">- {author}</div>
    </div>
  );
}
