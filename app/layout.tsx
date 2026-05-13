import type { Metadata } from 'next';
import { Fraunces, Roboto_Flex } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  axes: ['opsz'],
});

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Summit Fellowship | Skardu Scale-Up Fellowship',
  description: 'A 7-day intensive retreat for Pakistani social entrepreneurs to design scale-ready impact solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${robotoFlex.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
