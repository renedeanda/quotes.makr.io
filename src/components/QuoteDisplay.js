
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
