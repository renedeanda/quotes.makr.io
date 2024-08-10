
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Inspirational Quotes',
  description: 'Daily inspiration and motivational quotes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-t from-[#ff6e7f] to-[#bfe9ff]">
          {children}
        </div>
      </body>
    </html>
  )
}
