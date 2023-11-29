import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.scss';
import NextAuthProvider from '@/components/nextauth-provider';

const lato = Lato({
  weight: ['400', '900', '700'],
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: 'Pyxis',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={lato.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
