import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FormatGenius - Document Formatting Made Easy',
  description: 'Professional document formatting service for academic and business documents',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">FormatGenius</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
                  <a href="/upload" className="text-gray-700 hover:text-gray-900">Upload</a>
                  <a href="/history" className="text-gray-700 hover:text-gray-900">History</a>
                  <a href="/pricing" className="text-gray-700 hover:text-gray-900">Pricing</a>
                  <a href="/account" className="text-gray-700 hover:text-gray-900">Account</a>
                </div>
              </div>
            </nav>
          </header>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
