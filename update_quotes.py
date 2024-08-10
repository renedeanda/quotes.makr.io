import os

def update_file(path, content):
    with open(path, 'w') as f:
        f.write(content)
    print(f"Updated file: {path}")

def implement_scrollable_layout():
    # Update layout component
    layout_content = '''
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Inspirational Quotes',
  description: 'Daily inspiration and motivational quotes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-[#8E44AD] to-[#2980B9] overflow-y-auto">
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
'''
    update_file('src/app/layout.js', layout_content)

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
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col justify-center items-center mb-8">
        {currentQuote && <QuoteDisplay quote={currentQuote} />}
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button onClick={() => setDailyQuote(quotes)} className="button">Daily Quote</button>
        <button onClick={getRandomQuote} className="button">Random Quote</button>
        <button onClick={() => setMode('explore')} className="button">Explore Quotes</button>
        <button onClick={() => setMode('favorites')} className="button">Favorites</button>
        <button onClick={() => setMode('share')} className="button">Create Shareable</button>
      </div>
      <div className="mt-8">
        {mode === 'explore' && <QuoteExplorer quotes={quotes} setCurrentQuote={setCurrentQuote} />}
        {mode === 'favorites' && <FavoriteQuotes />}
        {mode === 'share' && currentQuote && <ShareableQuote quote={currentQuote} />}
      </div>
    </div>
  );
}
'''
    update_file('src/app/page.js', page_content)

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
  color: #a0d8ff;
  background: linear-gradient(to bottom, 
              rgb(var(--background-start-rgb)),
              rgb(var(--background-end-rgb))) no-repeat center center fixed;
  background-size: cover;
}

.button {
  @apply px-4 py-2 rounded-full transition-all duration-300 ease-in-out;
  background: rgba(255, 255, 255, 0.2);
  color: #a0d8ff;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.content-container {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
}
'''
    update_file('src/app/globals.css', globals_css_content)

    print("Scrollable layout implemented!")

if __name__ == "__main__":
    implement_scrollable_layout()
