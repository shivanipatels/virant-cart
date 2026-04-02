import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/common/ProductCard';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { CART_CONFIG } from '../utils/config';

function Wishlist() {
  const { wishlistItems } = useWishlist(); // Get wishlist items from context
  const { RADIUS } = CART_CONFIG;   // Get radius class from config for consistent styling

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 md:px-10 font-sans selection:bg-brand-primary selection:text-white">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-2xl font-black text-brand-dark tracking-tighter uppercase italic flex items-center gap-3">
          My Wishlist <span className="text-slate-300 font-light italic">({wishlistItems.length})</span>
        </h1>
        <div className="flex items-center gap-4 mt-2">
          <div className="h-[2px] w-12 bg-brand-primary"></div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Saved for Later • Lucknow's Selection
          </p>
        </div>
      </div>

      {/* Conditional Rendering: Empty State */}
      {wishlistItems.length === 0 ? (
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-32 text-center bg-brand-surface rounded-[3rem] border border-dashed border-slate-200">
          <div className={`w-24 h-24 bg-white ${RADIUS} shadow-sm flex items-center justify-center mb-8 rotate-3`}>
            <FiHeart size={40} className="text-slate-200" />
          </div>
          <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tighter">Your Wishlist is Empty</h2>
          <p className="text-xs text-slate-400 mt-2 mb-10 uppercase tracking-widest font-bold max-w-[200px]">
            Explore our collection and save items you love here
          </p>
          <Link 
            to="/" 
            className={`bg-brand-dark text-white px-12 py-5 ${RADIUS} font-black text-[11px] uppercase tracking-[0.3em] hover:bg-brand-primary transition-all shadow-xl shadow-slate-100 active:scale-95`}
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        /* Wishlist Grid */
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
          {wishlistItems.map((product) => (
            <div key={product.id} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;