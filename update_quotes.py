import os

def update_file(path, content):
    with open(path, 'w') as f:
        f.write(content)
    print(f"Updated file: {path}")

def implement_darker_gradient():
    # Update global styles
    globals_css_content = '''
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background-start-rgb: 142, 68, 173;
  --background-end-rgb: 41, 128, 185;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background: linear-gradient(to bottom, 
              rgb(var(--background-start-rgb)),
              rgb(var(--background-end-rgb))) no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #ffffff;
}

.content-container {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quote-text {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 600;
}

.author-text {
  font-size: 1.1rem;
  font-style: italic;
  color: #e0e0e0;
}

.button {
  @apply px-4 py-2 rounded-full transition-all duration-300 ease-in-out;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.favorite-button {
  color: #ffd700;
  font-weight: 600;
}

.favorite-button:hover {
  color: #ffee58;
}
'''
    update_file('src/app/globals.css', globals_css_content)

    # Update page component (minimal changes, just ensuring consistency)
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
    <div className="w-full max-w-4xl content-container p-8">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-white">
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

    print("Darker gradient background implemented successfully!")

if __name__ == "__main__":
    implement_darker_gradient()
