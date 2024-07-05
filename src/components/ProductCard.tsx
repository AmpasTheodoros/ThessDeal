const ProductCard = ({ product }) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img className="w-full" src={product.imageUrls[0]} alt={product.title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product.title}</div>
          <p className="text-gray-700 text-base">Old Price: {product.startingPrice}</p>
          <p className="text-gray-700 text-base">New Price: {product.currentPrice}</p>
          {product.discountPercent && (
            <p className="text-gray-700 text-base">Discount: {product.discountPercent}</p>
          )}
          {product.startPricePerKilo && (
            <p className="text-gray-700 text-base">Start Price per Kilo: {product.startPricePerKilo}</p>
          )}
          <p className="text-gray-700 text-base">Price per Kilo: {product.pricePerKilo}</p>
        </div>
        <div className="px-6 py-4">
          {product.imageUrls.map((url, index) => (
            <img key={index} className="w-full" src={url} alt={`${product.title} ${index}`} />
          ))}
        </div>
      </div>
    );
  }
  
  export default ProductCard;
  