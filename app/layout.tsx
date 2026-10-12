import type { Metadata } from 'next';
import { Instrument_Serif, Geist, JetBrains_Mono, Caveat } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import StagingBanner from './components/StagingBanner';
import { isProductionDeploy } from '@/lib/env';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-handwriting',
});

export const metadata: Metadata = {
  title: 'Summit Fellowship — Designed for Scale',
  description:
    "A seven-day intensive for Pakistan's most promising social enterprises, matching founders with strategy, mentoring and capital to scale.",
  robots: isProductionDeploy() ? undefined : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geist.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <body>
        <StagingBanner />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
