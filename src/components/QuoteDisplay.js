
const QuoteDisplay = ({ quote }) => {
  return (
    <div className="text-center mb-4">
      <p className="quote-text">{quote.quote}</p>
      <p className="author-text">- {quote.author}</p>
    </div>
  );
};

export default QuoteDisplay;
