import os

def update_file(path, content):
    with open(path, 'w') as f:
        f.write(content)
    print(f"Updated file: {path}")

def update_project():
    # Update ShareableQuote component
    shareable_quote_content = '''
import { useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

const ShareableQuote = ({ quote }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [aspect, setAspect] = useState('1:1');

  const generateAndDownloadImage = async () => {
    const quoteElement = document.getElementById('quote-to-share');
    if (quoteElement) {
      const canvas = await html2canvas(quoteElement, {
        backgroundColor: null,
        scale: 2,
      });
      const image = canvas.toDataURL('image/png');
      setImageUrl(image);
      
      // Trigger download
      const link = document.createElement('a');
      link.href = image;
      link.download = `inspirational_quote_${aspect}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.div 
      className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div id="quote-to-share" className={`aspect-${aspect === '1:1' ? 'square' : 'video'} bg-gradient-to-t from-purple-900 to-pink-500 p-8 rounded-lg flex flex-col justify-center items-center`}>
        <p className="text-2xl text-white mb-4 text-center">{quote.quote}</p>
        <p className="text-xl text-purple-200">- {quote.author}</p>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <select 
          value={aspect} 
          onChange={(e) => setAspect(e.target.value)}
          className="bg-purple-700 text-white p-2 rounded"
        >
          <option value="1:1">Square (1:1)</option>
          <option value="16:9">Rectangle (16:9)</option>
        </select>
        
        <button
          onClick={generateAndDownloadImage}
          className="px-6 py-2 bg-purple-500 hover:bg-purple-400 text-white rounded transition-colors"
        >
          Generate & Download
        </button>
      </div>
      
      {imageUrl && (
        <img src={imageUrl} alt="Generated Quote" className="mt-4 rounded-lg shadow-md" />
      )}
    </motion.div>
  );
};

export default ShareableQuote;
'''
    update_file('src/components/ShareableQuote.tsx', shareable_quote_content)

    # Update global styles
    globals_css_content = '''
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 236, 56, 188;
  --background-end-rgb: 74, 14, 78;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(to top, #4a0e4e, #7209b7, #b5179e, #ec38bc);
  min-height: 100vh;
}

/* Custom animations */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(181, 23, 158, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(181, 23, 158, 0.7);
}
'''
    update_file('src/styles/globals.css', globals_css_content)

    # Update main page to use new color scheme
    page_content = '''
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
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-white">
          Inspirational Quotes
        </h1>
        {currentQuote && <QuoteDisplay quote={currentQuote} />}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() => setMode('daily')}
            className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-400 transition-colors"
          >
            Daily Quote
          </button>
          <button
            onClick={getRandomQuote}
            className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-400 transition-colors"
          >
            Random Quote
          </button>
          <button
            onClick={() => setMode('explore')}
            className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-400 transition-colors"
          >
            Explore Quotes
          </button>
          <button
            onClick={() => setMode('favorites')}
            className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-400 transition-colors"
          >
            Favorites
          </button>
          <button
            onClick={() => setMode('share')}
            className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-400 transition-colors"
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
'''
    update_file('src/app/page.tsx', page_content)

    print("Project updated successfully!")

if __name__ == "__main__":
    update_project()
