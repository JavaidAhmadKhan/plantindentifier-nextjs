import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Plant Identifier App',
  description: 'Identify plants using AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-green-50 min-h-screen`} suppressHydrationWarning>
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-green-800 mb-8">Plant Identifier</h1>
          {children}
        </main>
      </body>
    </html>
  )
}