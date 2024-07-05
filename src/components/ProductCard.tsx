'use client';

import axios from 'axios';
import { useAuth, useUser } from '@clerk/nextjs';

const ProductCard = ({ product }) => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const handleFavorite = async () => {
    if (!isSignedIn) {
      window.location.href = '/sign-in'; // Redirect to the sign-in page
      return;
    }

    try {
      const response = await axios.post('/api/favorites', { productId: product.id });
      console.log('Favorite added:', response.data);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  return (
    <div className="product-card p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{product.title}</h2>
      <p>Old Price: {product.startingPrice}</p>
      <p>New Price: {product.currentPrice}</p>
      <p>Discount Percent: {product.discountPercent}</p>
      <p>Price per Kilo: {product.pricePerKilo}</p>
      <p>Start Price per Kilo: {product.startPricePerKilo}</p>
      <div className="images">
        {product.imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Product Image ${index + 1}`} className="w-32 h-32 object-cover" />
        ))}
      </div>
      <button onClick={handleFavorite} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Add to Favorites</button>
    </div>
  );
};

export default ProductCard;
