import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Project Management App',
  description: 'A project management web app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <header className='app-header'>
          <span>Project Management App</span>
          <Link href="/api/auth/signout">Logout</Link>
        </header>
        {children}
      </body>
    </html>
  )
}
