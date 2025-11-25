import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { draftMode } from 'next/headers';

import { config } from '@/lib/config';
import { DraftMode } from '@/components/studio/draft-mode';

import '@/styles/code.css';
import '@/styles/globals.css';

import React from 'react';

import { Logo } from '@/components/global/logo';
import { Navigation } from '@/components/global/navigation';
import { Container } from '@/components/page/container';
import { TRPCProvider } from '@/trpc/react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: config.title,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const draftModeEnabled = (await draftMode()).isEnabled;
  return (
    <html lang='en' className={(draftModeEnabled && 'draft-mode') || undefined}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <Container>
            <Logo />
            <Navigation />
          </Container>
        </header>
        <TRPCProvider>{children}</TRPCProvider>
        <DraftMode enabled={draftModeEnabled} />
      </body>
    </html>
  );
}
