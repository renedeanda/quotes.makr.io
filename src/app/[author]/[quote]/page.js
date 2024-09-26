import { notFound } from 'next/navigation'
import QuoteDisplay from '@/components/QuoteDisplay'
import getAllQuotes from '@/utils/getAllQuotes'

export async function generateStaticParams() {
  const quotes = await getAllQuotes()
  
  return quotes.map((quote) => ({
    author: quote.author.replace(/\s+/g, '-').toLowerCase(),
    quote: quote.quote.slice(0, 50).replace(/\s+/g, '-').toLowerCase(),
  }))
}

export async function generateMetadata({ params }) {
  const quotes = await getAllQuotes()
  const quote = quotes.find(
    (q) => 
      q.author.replace(/\s+/g, '-').toLowerCase() === params.author &&
      q.quote.slice(0, 50).replace(/\s+/g, '-').toLowerCase() === params.quote
  )

  if (!quote) {
    return {}
  }

  return {
    title: `${quote.quote.slice(0, 50)}... - ${quote.author}`,
    description: `Inspirational quote by ${quote.author}: "${quote.quote}"`,
  }
}

export default async function QuotePage({ params }) {
  const quotes = await getAllQuotes()
  const quote = quotes.find(
    (q) => 
      q.author.replace(/\s+/g, '-').toLowerCase() === params.author &&
      q.quote.slice(0, 50).replace(/\s+/g, '-').toLowerCase() === params.quote
  )

  if (!quote) {
    notFound()
  }

  return <QuoteDisplay quote={quote} />
}