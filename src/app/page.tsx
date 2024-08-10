
"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import QuoteDisplay from '@/components/QuoteDisplay';
import DynamicBackground from '@/components/DynamicBackground';

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
        const today = new Date().getDate();
        setCurrentQuote(data.quotes.find(q => q.day === today));
      });
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
    setMode('random');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <DynamicBackground />
      <div className="z-10 w-full max-w-4xl bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-amber-500">
          Inspirational Quotes
        </h1>
        {currentQuote && <QuoteDisplay quote={currentQuote} />}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() => setMode('daily')}
            className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
          >
            Daily Quote
          </button>
          <button
            onClick={getRandomQuote}
            className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
          >
            Random Quote
          </button>
          <button
            onClick={() => setMode('explore')}
            className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
          >
            Explore Quotes
          </button>
          <button
            onClick={() => setMode('favorites')}
            className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
          >
            Favorites
          </button>
          <button
            onClick={() => setMode('share')}
            className="px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
          >
            Create Shareable
          </button>
        </div>
        {mode === 'explore' && <QuoteExplorer quotes={quotes} setCurrentQuote={setCurrentQuote} />}
        {mode === 'favorites' && <FavoriteQuotes />}
        {mode === 'share' && currentQuote && <ShareableQuote quote={currentQuote} />}
      </div>
    </main>
  );
}
