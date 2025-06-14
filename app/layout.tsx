import type { Metadata } from 'next';
import Providers from 'src/Providers';

export const metadata: Metadata = {
  title: 'HTML 2 Url',
  description: 'Convert HTML to URL for notion embeding',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
