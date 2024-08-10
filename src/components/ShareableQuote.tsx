
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

const ShareableQuote = ({ quote }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [aspect, setAspect] = useState('1:1');
  const quoteRef = useRef(null);

  const generateAndDownloadImage = async () => {
    if (quoteRef.current) {
      const canvas = await html2canvas(quoteRef.current, {
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

  const getQuoteStyles = () => {
    if (aspect === '1:1') {
      return 'w-64 h-64 text-lg';
    } else {
      return 'w-96 h-54 text-xl';
    }
  };

  return (
    <motion.div 
      className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg mt-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div 
        ref={quoteRef} 
        className={`${getQuoteStyles()} bg-gradient-to-t from-pink-400 to-blue-400 p-4 rounded-lg flex flex-col justify-center items-center`}
      >
        <p className="text-white mb-2 text-center">{quote.quote}</p>
        <p className="text-blue-200 text-sm">- {quote.author}</p>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <select 
          value={aspect} 
          onChange={(e) => setAspect(e.target.value)}
          className="bg-white bg-opacity-20 text-white p-2 rounded"
        >
          <option value="1:1">Square (1:1)</option>
          <option value="16:9">Rectangle (16:9)</option>
        </select>
        
        <button
          onClick={generateAndDownloadImage}
          className="px-6 py-2 bg-white bg-opacity-20 text-white rounded hover:bg-opacity-30 transition-colors"
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
