import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thai Romanization Tester',
  description: 'Test Thai Romanization library',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
