
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

const ShareableQuote = ({ quote }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const quoteRef = useRef(null);

  const generateImage = async () => {
    if (quoteRef.current) {
      const canvas = await html2canvas(quoteRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      const image = canvas.toDataURL('image/png');
      setImageUrl(image);
    }
  };

  return (
    <div className="mt-8">
      <motion.div
        ref={quoteRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-amber-400 to-amber-600 p-8 rounded-lg shadow-lg"
      >
        <p className="text-2xl font-bold text-white mb-4">{quote.quote}</p>
        <p className="text-xl text-amber-100">- {quote.author}</p>
      </motion.div>
      <button
        onClick={generateImage}
        className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
      >
        Generate Shareable Image
      </button>
      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Shareable Quote" className="rounded-lg shadow-lg" />
          <a
            href={imageUrl}
            download="inspirational_quote.png"
            className="mt-2 inline-block px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ShareableQuote;
