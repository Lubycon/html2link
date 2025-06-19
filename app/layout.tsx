import Providers from 'app/Providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Linkify',
  description: 'Free Convert HTML to URL for notion embeding',
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
        <meta property="og:title" content="Linkify for Notion" />
        <meta property="og:description" content="Free Convert HTML to URL for Notion embedding" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://html2link.lubycon.io/" />
        <meta property="og:image" content="https://html2link.lubycon.io/og_image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HTML 2 Url" />
        <meta name="twitter:description" content="Free Convert HTML to URL for Notion embedding" />
        <meta name="twitter:image" content="https://html2link.lubycon.io/og_image.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
