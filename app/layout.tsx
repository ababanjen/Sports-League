import type { Metadata } from "next";
import { Barlow } from 'next/font/google';
import "./globals.css";

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow', 
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sports Board",
  description: "Bet on talent technical assesment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  className={`${barlow.className} w-fit`}>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
