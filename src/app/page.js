
"use client";
import { useState, useEffect } from 'react';
import QuoteDisplay from '@/components/QuoteDisplay';
import QuoteExplorer from '@/components/QuoteExplorer';
import FavoriteQuotes from '@/components/FavoriteQuotes';
import ShareableQuote from '@/components/ShareableQuote';

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
    <div className="w-full max-w-4xl content-container p-8">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-white">
        Inspirational Quotes
      </h1>
      <div className="flex flex-col items-center">
        {currentQuote && <QuoteDisplay quote={currentQuote} />}
        <div className="flex flex-wrap justify-center gap-4 mt-4 mb-4">
          <button onClick={() => setDailyQuote(quotes)} className="button">Daily Quote</button>
          <button onClick={getRandomQuote} className="button">Random Quote</button>
          <button onClick={() => setMode('explore')} className="button">Explore Quotes</button>
          <button onClick={() => setMode('favorites')} className="button">Favorites</button>
          <button onClick={() => setMode('share')} className="button">Create Shareable</button>
        </div>
      </div>
      {mode === 'explore' && <QuoteExplorer quotes={quotes} setCurrentQuote={setCurrentQuote} />}
      {mode === 'favorites' && <FavoriteQuotes />}
      {mode === 'share' && currentQuote && <ShareableQuote quote={currentQuote} />}
    </div>
  );
}
