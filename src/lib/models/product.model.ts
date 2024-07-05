import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    currentPrice: { type: String, required: true },  // Adjusted to String to match scraped data
    startingPrice: { type: String },
    imageUrls: { type: [String], required: true },  // Array to store multiple image URLs
    pricePerKilo: { type: String },
    discountPercent: { type: String },
    startPricePerKilo: { type: String }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
