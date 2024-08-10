
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FavoriteQuotes = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (quote) => {
    const newFavorites = favorites.filter(fav => fav.quote !== quote.quote);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-amber-300 mb-4">Your Favorite Quotes</h2>
      {favorites.length === 0 ? (
        <p className="text-amber-100">You haven't added any favorites yet.</p>
      ) : (
        <div className="space-y-4">
          {favorites.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white bg-opacity-10 p-4 rounded-md"
            >
              <p className="text-amber-100">{quote.quote}</p>
              <p className="text-amber-300 text-sm mt-2">- {quote.author}</p>
              <button
                onClick={() => removeFavorite(quote)}
                className="mt-2 text-amber-500 hover:text-amber-600 transition-colors"
              >
                Remove from Favorites
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteQuotes;
