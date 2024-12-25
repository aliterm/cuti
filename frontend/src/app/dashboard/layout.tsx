import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Simple Aplikasi Cuti',
  description: 'Generated by create next app',
}
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen bg-slate-50">{children}</div>
}
