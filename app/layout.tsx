import Providers from 'app/Providers';
import type { Metadata } from 'next';
import 'normalize.css';

const title = 'Linkify [Embed Wizard]';
const description = 'Free Convert HTML to URL for notion embeding';

export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#D5E7F2" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://html2link.lubycon.io/" />
        <meta property="og:image" content="https://html2link.lubycon.io/og_image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://html2link.lubycon.io/og_image.png" />

        <link rel="icon" type="image/png" href="/linkify-logo.png" />
        <meta name="google-adsense-account" content="ca-pub-4113746985528013" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
