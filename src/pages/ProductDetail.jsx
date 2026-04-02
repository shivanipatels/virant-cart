 import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; 
import ProductCard from '../components/common/ProductCard';
import { CART_CONFIG } from '../utils/config';
import { FiHeart } from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';

function ProductDetail() {
  const { products } = useProducts();
  const { id } = useParams();  // Get product ID from URL parameters
  const { addToCart } = useCart(); // Get addToCart function from CartContext to add products to the shopping bag
  const { toggleWishlist, isItemInWishlist } = useWishlist();  // Get toggleWishlist function to add/remove products from wishlist and isItemInWishlist to check if the product is already in the wishlist
  const { SYMBOL, RADIUS } = CART_CONFIG;      

  const [loading, setLoading] = useState(true);  // State to manage loading state while fetching product details
  const [product, setProduct] = useState(null);  // State to store the current product details

  useEffect(() => {     // Simulate fetching product details based on the ID from the URL. In a real application, this would be an API call.
    setLoading(true);
    
    const foundProduct = products.find((p) => String(p.id) === String(id));
    
    setTimeout(() => {
      setProduct(foundProduct);
      setLoading(false);
    }, 800);
  }, [id]);

  // Check if the current product is in the wishlist to determine the state of the wishlist button
  const isFavorite = isItemInWishlist(String(product?.id));

  const similarProducts = product   // Find similar products based on the same category, excluding the current product
    ? products.filter((p) => p.category === product.category && String(p.id) !== String(id))
    : [];

  if (loading) {  // Show a loading spinner while the product details are being fetched
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Collection...</p>
      </div>
    );
  }

  if (!product) {  // If no product is found with the given ID, display a "Product Not Found" message
    return (
      <div className="py-40 text-center font-black uppercase tracking-widest text-slate-400">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-20">
        
        <div className="flex flex-col lg:flex-row gap-16 mb-32">
          {/* Left Side: Product Image */}
          <div className="flex-1">
            <div className={`aspect-[4/5] bg-brand-surface ${RADIUS} overflow-hidden border border-slate-100 shadow-sm`}>
              <img 
                src={product.image} 
                alt={`${product.name} - ${product.category}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>

          {/* Right Side: Information */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-brand-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-brand-dark uppercase tracking-tighter mb-6 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-black text-brand-dark mb-8">
              {SYMBOL}{product.price}
            </p>
            
            <p className="text-slate-500 leading-relaxed text-sm font-medium mb-12 max-w-md">
              This {product.name} is specially curated for our premium collection. 
              High-quality materials and expert craftsmanship ensure that you get 
              the best experience. Available for fast delivery in Lucknow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="button" 
                onClick={() => addToCart(product)}
                className={`flex-1 bg-brand-dark text-white px-12 py-5 ${RADIUS} font-black text-[11px] uppercase tracking-[0.2em] hover:bg-brand-primary transition-all active:scale-95 shadow-xl`}
              >
                Add to Shopping Bag
              </button>

              <button 
                type="button" 
                aria-label="Wishlist" 
                onClick={() => toggleWishlist(product)}
                className={`p-5 ${RADIUS} border-2 transition-all active:scale-90 flex items-center justify-center
                  ${isFavorite 
                    ? 'bg-brand-secondary border-brand-secondary text-white shadow-lg' 
                    : 'bg-white border-slate-100 text-slate-400 hover:text-brand-secondary hover:border-brand-secondary'}`}
              >
                <FiHeart size={24} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="border-t border-slate-100 pt-20">
            <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tighter mb-12">
              More from <span className="text-brand-primary">{product.category}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {similarProducts.map((item) => (
                <ProductCard key={String(item.id)} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;