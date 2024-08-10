
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Inspirational Quotes - Daily Motivation',
  description: 'Discover daily inspirational quotes to motivate and uplift your spirit. Find wisdom, courage, and positivity in our curated collection of quotes from great thinkers and leaders.',
  keywords: 'inspirational quotes, motivation, daily quotes, wisdom, personal growth',
  author: 'Rene DeAnda',
  openGraph: {
    title: 'Inspirational Quotes - Daily Motivation',
    description: 'Find daily inspiration and motivation with our curated quotes.',
    images: [
      {
        url: 'https://quotes.makr.io/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Inspirational Quotes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inspirational Quotes - Daily Motivation',
    description: 'Find daily inspiration and motivation with our curated quotes.',
    images: ['https://quotes.makr.io/twitter-image.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  )
}
