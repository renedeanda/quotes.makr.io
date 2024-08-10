
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
      <p className="author-text">- {quote.author}</p>
      <button
        onClick={toggleFavorite}
        className="mt-4 text-white hover:text-yellow-300 transition-colors"
      >
        {isFavorite ? '★ Favorited' : '☆ Add to Favorites'}
      </button>
    </div>
  );
};

export default QuoteDisplay;
