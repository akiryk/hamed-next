import './globals.css';

import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';
import Providers from './providers';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import { Playfair_Display } from 'next/font/google';
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
});

export const metadata = {
  title: 'Adam Kiryk',
  description: 'Created using NextJs 13'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} ${playfairDisplay.variable}`}>
        <Providers>
          <Header />
          <main className='px-4'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
