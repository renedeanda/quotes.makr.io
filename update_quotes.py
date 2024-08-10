import os

def update_file(path, content):
    with open(path, 'w') as f:
        f.write(content)
    print(f"Updated file: {path}")

def improve_accessibility():
    # Update global styles
    globals_css_content = '''
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 44, 62, 80;
  --background-start-rgb: 255, 183, 197;
  --background-end-rgb: 209, 236, 255;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(to bottom, 
              rgb(var(--background-start-rgb)),
              rgb(var(--background-end-rgb))) no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.glass-morphism {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quote-text {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;
  color: rgb(44, 62, 80);
}

.author-text {
  font-size: 1.1rem;
  font-style: italic;
  color: rgb(52, 73, 94);
}

.button {
  @apply px-4 py-2 rounded-full transition-all duration-300 ease-in-out;
  background: rgba(52, 152, 219, 0.7);
  color: white;
  font-weight: 600;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.button:hover {
  background: rgba(52, 152, 219, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.favorite-button {
  color: rgb(52, 152, 219);
  font-weight: 600;
}

.favorite-button:hover {
  color: rgb(41, 128, 185);
}
'''
    update_file('src/app/globals.css', globals_css_content)

    # Update QuoteDisplay component
    quote_display_content = '''
import { useState, useEffect } from 'react';

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
    <div className="text-center">
      <p className="quote-text mb-4">{quote.quote}</p>
      <p className="author-text mb-4">- {quote.author}</p>
      <button
        onClick={toggleFavorite}
        className="favorite-button mt-4 transition-colors"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? '★ Favorited' : '☆ Add to Favorites'}
      </button>
    </div>
  );
};

export default QuoteDisplay;
'''
    update_file('src/components/QuoteDisplay.js', quote_display_content)

    # Update page component
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
    <div className="w-full max-w-4xl glass-morphism p-8">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-gray-800">
        Inspirational Quotes
      </h1>
      {currentQuote && <QuoteDisplay quote={currentQuote} />}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button onClick={() => setMode('daily')} className="button">Daily Quote</button>
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

    print("Website accessibility and readability improved!")

if __name__ == "__main__":
    improve_accessibility()
