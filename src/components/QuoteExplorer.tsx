
import { useState } from 'react';
import { motion } from 'framer-motion';

const QuoteExplorer = ({ quotes, setCurrentQuote }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuotes = quotes.filter(quote =>
    quote.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-8">
      <input
        type="text"
        placeholder="Search quotes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 rounded-md bg-white bg-opacity-20 text-white placeholder-blue-200"
      />
      <div className="mt-4 max-h-96 overflow-y-auto">
        {filteredQuotes.map((quote, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white bg-opacity-10 p-4 rounded-md mb-4 cursor-pointer hover:bg-opacity-20 transition-colors"
            onClick={() => setCurrentQuote(quote)}
          >
            <p className="text-white">{quote.quote}</p>
            <p className="text-gray-200 text-sm mt-2">- {quote.author}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuoteExplorer;
