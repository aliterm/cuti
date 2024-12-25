import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Simple Aplikasi Cuti',
  description: 'Generated by create next app',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased `}>{children}</body>
    </html>
  )
}
