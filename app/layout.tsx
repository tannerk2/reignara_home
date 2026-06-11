import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
})

const bavex = localFont({
  src: '../public/fonts/Bavex.ttf',
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Reignara — Powering the next generation of pageantry',
  description: 'Reignara builds tools that empower pageant directors, titleholders, and sponsors to operate with clarity, confidence, and connection.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bavex.variable} bg-bg`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
