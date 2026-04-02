 import React, { useState } from 'react';
import { FiHeart, FiCheck } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Link } from "react-router-dom";
import { CART_CONFIG } from "../../utils/config";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isItemInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);

  const isFavorite = isItemInWishlist(product.id);
  const { SYMBOL, RADIUS, DEFAULT_MARKUP } = CART_CONFIG;

  const colorClasses = {
    primary: "bg-brand-primary hover:bg-brand-primary/90",
    dark: "bg-brand-dark hover:bg-brand-primary",
    success: "bg-brand-success text-white",
    textPrimary: "text-brand-primary",
    textDark: "text-brand-dark"
  };

  const originalPrice = product.price + DEFAULT_MARKUP; 

  const handleAction = (e, callback, type) => { // Unified handler for both wishlist and cart actions, preventing event propagation and managing the adding state for cart actions
    e.preventDefault();
    e.stopPropagation();
    
    if (type === 'cart') {
      setIsAdding(true);
      callback();
      setTimeout(() => setIsAdding(false), 1500);
    } else {
      callback();
    }
  };

  return (
    <div className="group relative bg-white flex flex-col transition-all duration-500">
      <Link 
        to={`/product/${product.id}`} 
        className={`relative aspect-[4/5] overflow-hidden ${RADIUS} bg-brand-surface border border-slate-100 shadow-sm block`}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
        />
        
        {/* Wishlist Button - Exact Original UI */}
        <button 
          onClick={(e) => handleAction(e, () => toggleWishlist(product), 'wishlist')}
          className={`absolute top-5 right-5 p-3 backdrop-blur-md rounded-full shadow-lg transition-all active:scale-90 z-30 
            ${isFavorite ? 'bg-brand-secondary text-white' : 'bg-white/90 text-slate-400 hover:text-brand-secondary'}`}
        >
          <FiHeart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        {/* Add to Bag Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 z-20 transition-all duration-500 opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
          <button
            onClick={(e) => handleAction(e, () => addToCart(product), 'cart')}
            disabled={isAdding}
            className={`w-full py-3.5 ${RADIUS} font-black text-[10px] tracking-[0.1em] flex items-center justify-center gap-2 shadow-2xl transition-all active:scale-95
              ${isAdding 
                ? `${colorClasses.success} cursor-default` 
                : `${colorClasses.dark} text-white`}`}
          >
            {isAdding ? (
              <><FiCheck size={18} /> ADDED!</>
            ) : (
              <><HiOutlineShoppingBag size={18} /> ADD TO BAG</>
            )}
          </button>
        </div>
      </Link>

      <div className="mt-6 space-y-2 px-1 text-left">
        <p className={`text-[9px] font-black ${colorClasses.textPrimary} uppercase tracking-[0.2em] mb-1`}>
          {product.category}
        </p>
        
        <Link to={`/product/${product.id}`}>
          <h3 
          title={product.name}
          className={`text-sm font-bold ${colorClasses.textDark} leading-snug hover:text-brand-primary transition-colors cursor-pointer line-clamp-1`}>
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-3 pt-1 flex-wrap">
          <span className={`text-base font-black  ${colorClasses.textDark}`}>{SYMBOL}{product.price}</span>
          <span className="text-xs text-slate-400 line-through font-medium">{SYMBOL}{originalPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;