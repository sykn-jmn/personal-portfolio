import type { Metadata, Viewport } from 'next';
import { Archivo, Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Archivo({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jeman Mama | Software Engineer & Dev Lead',
  description:
    'Software engineer and dev lead at Orange & Bronze. Lending, credit, and live consultation systems, plus an AI-assisted workflow people still own. Based in the Philippines.',
  openGraph: {
    title: 'Jeman Mama | Software Engineer & Dev Lead',
    description:
      'I lead delivery on fintech systems and still write the code. Based in the Philippines.',
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: '#F3F5F8' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
