import QuotePageClient from '@/components/QuotePageClient';
import getAllQuotes from '@/utils/getAllQuotes';

export default async function Home() {
  const quotes = await getAllQuotes();

  return <QuotePageClient initialQuotes={quotes} />;
}