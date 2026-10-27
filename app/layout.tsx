import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jeman Mama — Engineer & Curious Human',
  description: 'Hands-on software engineer and dev lead. Thoughtful architecture, human-reviewed AI workflows, and a healthy appetite for life. Get to know Jeman Mama.',
  openGraph: { title: 'Jeman Mama — Engineer & Curious Human', description: 'Thoughtful code. Curious human. A little bit of work, a little bit of life.', type: 'website', locale: 'en_US' },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: '#f5f3eb' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
