import type { Metadata } from 'next';
import { Crimson_Pro, Source_Sans_3 } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import StagingBanner from './components/StagingBanner';
import { isProductionDeploy, siteUrl } from '@/lib/env';
import './globals.css';

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['300', '400'],
  // Real italics for the accent words in headings (otherwise the browser slants the upright letters).
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Friends of Pakistan Fellowship — Designed for Scale',
  description:
    "A seven-day intensive for Pakistan's most promising social enterprises, matching founders with strategy, mentoring and capital to scale.",
  robots: isProductionDeploy() ? undefined : { index: false, follow: false },
  // Link previews (WhatsApp, LinkedIn, X): the preview images come from the opengraph-image files.
  metadataBase: new URL(siteUrl()),
  openGraph: { siteName: 'Friends of Pakistan Fellowship', type: 'website', locale: 'en_GB' },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${crimsonPro.variable} ${sourceSans.variable}`}
    >
      <body>
        <StagingBanner />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
