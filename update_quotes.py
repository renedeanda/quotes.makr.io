import os

def update_file(path, content):
    with open(path, 'w') as f:
        f.write(content)
    print(f"Updated file: {path}")

def update_layout_and_prominence():
    # Update main page component
    page_content = '''
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
    <div className="w-full max-w-4xl content-container p-8 flex flex-col justify-center min-h-screen">
      <div className="flex-grow flex flex-col justify-center">
        {currentQuote && <QuoteDisplay quote={currentQuote} />}
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button onClick={() => setDailyQuote(quotes)} className="button">Daily Quote</button>
        <button onClick={getRandomQuote} className="button">Random Quote</button>
        <button onClick={() => setMode('explore')} className="button">Explore Quotes</button>
        <button onClick={() => setMode('favorites')} className="button">Favorites</button>
        <button onClick={() => setMode('share')} className="button">Create Shareable</button>
      </div>
      {mode === 'explore' && <QuoteExplorer quotes={quotes} setCurrentQuote={setCurrentQuote} />}
      {mode === 'favorites' && <FavoriteQuotes />}
      {mode === 'share' && currentQuote && <ShareableQuote quote={currentQuote} />}
    </div>
  );
}
'''
    update_file('src/app/page.js', page_content)

    # Update QuoteDisplay component
    quote_display_content = '''
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const QuoteDisplay = ({ quote }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
    setIsFavorite(favorites.some(fav => fav.quote === quote.quote));
  }, [quote]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.quote !== quote.quote);
      localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
    } else {
      favorites.push(quote);
      localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">{quote.quote}</p>
      <p className="text-xl md:text-2xl text-gray-200 mb-4">- {quote.author}</p>
      <button
        onClick={toggleFavorite}
        className="mt-4 text-blue-300 hover:text-blue-400 transition-colors text-lg"
      >
        {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
      </button>
    </motion.div>
  );
};

export default QuoteDisplay;
'''
    update_file('src/components/QuoteDisplay.js', quote_display_content)

    print("Layout updated and quote prominence increased!")

if __name__ == "__main__":
    update_layout_and_prominence()
