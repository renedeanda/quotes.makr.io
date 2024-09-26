import { notFound } from 'next/navigation'
import QuoteDisplay from '@/components/QuoteDisplay'
import getAllQuotes from '@/utils/getAllQuotes'

function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function generateStaticParams() {
  const quotes = await getAllQuotes()
  
  if (!Array.isArray(quotes) || quotes.length === 0) {
    console.error('No quotes found or quotes is not an array')
    return []
  }

  return quotes.map((quote) => ({
    author: createSlug(quote.author),
    quote: createSlug(quote.quote.slice(0, 50))
  }))
}

export async function generateMetadata({ params }) {
  const quotes = await getAllQuotes()
  const quote = quotes.find(
    (q) => 
      createSlug(q.author) === params.author &&
      createSlug(q.quote.slice(0, 50)) === params.quote
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
      createSlug(q.author) === params.author &&
      createSlug(q.quote.slice(0, 50)) === params.quote
  )

  if (!quote) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="z-10 w-full max-w-4xl quote-container p-8">
        <QuoteDisplay quote={quote} />
      </div>
    </div>
  )
}