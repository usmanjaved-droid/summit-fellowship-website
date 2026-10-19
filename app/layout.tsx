import type { Metadata } from 'next';
import { Crimson_Pro, Source_Sans_3 } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import StagingBanner from './components/StagingBanner';
import { isProductionDeploy } from '@/lib/env';
import './globals.css';

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['300', '400'],
  display: 'swap',
  variable: '--font-serif',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
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
      className={`${crimsonPro.variable} ${sourceSans.variable}`}
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
