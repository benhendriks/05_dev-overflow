import { ClerkProvider } from '@clerk/nextjs'
import React from 'react';
import {Inter, Space_Grotesk} from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100','200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
})

const SpaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk'
})

export const metadata: Metadata = {
  title: 'Dev Flow',
  description: 'Best ever!',
  icons: {
    icon: '/assets/images/site-logo.svg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      apperance={{
        elements: {
          formButtonPrimary: 'primary-gradient',
          footerActionLink: 'primary-text-gradient',
          hover: 'text-primary-500'
        }
      }}
    >
      <html lang="en">
        <body className={
          `${inter.variable} ${SpaceGrotesk.variable}`
        }>
          <h1 className="h1-bold">Hello World</h1>
          {children}</body>
      </html>
    </ClerkProvider>
  )
}
