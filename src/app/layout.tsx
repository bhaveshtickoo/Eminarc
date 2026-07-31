import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { BackgroundGrid } from '@/design-system/components/BackgroundGrid';
import { WorkspaceProvider } from '@/context/WorkspaceContext';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = Instrument_Serif({
  weight: ['400'],
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-serif',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Eminarc | Growth OS',
  description: 'AI-powered Growth Operating System for founders, startups, agencies, and B2B businesses.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} ${monoFont.variable}`}
    >
      <body className="antialiased bg-[#F6F2EB] text-[#18181B]">
        <WorkspaceProvider>
          <BackgroundGrid>
            {children}
          </BackgroundGrid>
        </WorkspaceProvider>
      </body>
    </html>
  );
}
