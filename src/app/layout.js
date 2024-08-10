
import './globals.css'
import { Lato } from 'next/font/google'
import Script from 'next/script'

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'Inspirational Quotes - Daily Motivation & Artistic Experience',
  description: 'Discover daily inspiration through curated quotes and immerse yourself in a unique digital art experience. Find motivation, create shareable quote images, and explore an innovative world of wisdom.',
  keywords: 'inspirational quotes, daily motivation, digital art, quote images, wisdom',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className={lato.className}>
        <div className="min-h-screen bg-gradient-to-b from-[#8E44AD] to-[#2980B9] overflow-y-auto">
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
