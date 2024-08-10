
"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import QuoteDisplay from '@/components/QuoteDisplay';

const QuoteExplorer = dynamic(() => import('@/components/QuoteExplorer'), { ssr: false });
const FavoriteQuotes = dynamic(() => import('@/components/FavoriteQuotes'), { ssr: false });
const ShareableQuote = dynamic(() => import('@/components/ShareableQuote'), { ssr: false });

export default function Home() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [mode, setMode] = useState('daily');

  useEffect(() => {
    fetch('/quotes.json')
      .then(response => response.json())
      .then(data => {
        setQuotes(data.quotes);
        setDailyQuote(data.quotes);
      });
  }, []);

  const setDailyQuote = (quotes) => {
    const today = new Date().getDate();
    const todayQuote = quotes.find(q => q.day === today);
    setCurrentQuote(todayQuote);
  };

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
    setMode('random');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="z-10 w-full max-w-4xl quote-container p-8">
        {currentQuote && <QuoteDisplay quote={currentQuote} />}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() => setDailyQuote(quotes)}
            className="px-6 py-2 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-colors"
          >
            Daily Quote
          </button>
          <button
            onClick={getRandomQuote}
            className="px-6 py-2 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-colors"
          >
            Random Quote
          </button>
          <button
            onClick={() => setMode('explore')}
            className="px-6 py-2 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-colors"
          >
            Explore Quotes
          </button>
          <button
            onClick={() => setMode('favorites')}
            className="px-6 py-2 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-colors"
          >
            Favorites
          </button>
          <button
            onClick={() => setMode('share')}
            className="px-6 py-2 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 transition-colors"
          >
            Create Shareable
          </button>
        </div>
        {mode === 'explore' && <QuoteExplorer quotes={quotes} setCurrentQuote={setCurrentQuote} />}
        {mode === 'favorites' && <FavoriteQuotes />}
        {mode === 'share' && currentQuote && <ShareableQuote quote={currentQuote} />}
      </div>
      <footer className="text-center text-white py-4">
        Discover the joy of daily gratitude with the <a href="https://delightfuljournal.com/?utm_source=quotes" className="text-blue-300 hover:underline">Delightful Gratitude Journal</a>.
        <br />
        &copy; {new Date().getFullYear()} Crafted with 🧡 + 🤖 by the <a href="https://rede.io/?utm_source=quotes" className="text-blue-300 hover:underline">Rede team</a>.
      </footer>
    </main>
  );
}
