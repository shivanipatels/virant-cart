 import React from 'react';
import { useCart } from '../context/CartContext';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { CART_CONFIG } from "../utils/config";

function Cart() {
  const { cart, removeCartItem, updateItemQuantity, subtotal, deliveryFee, totalAmount } = useCart(); // Get cart state and functions from CartContext to manage cart items and calculate totals
  const { SYMBOL, RADIUS } = CART_CONFIG;

  return (
    <div className="bg-brand-surface min-h-screen py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
              <HiOutlineShoppingBag size={40} className="text-slate-300" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tighter mb-2">
              Your bag is empty
            </h2>
            <p className="text-slate-500 font-medium text-sm mb-8 max-w-xs mx-auto">
              Looks like you haven't added anything to your bag yet. Let's find something special!
            </p>
            <Link 
              to="/" 
              className={`bg-brand-dark text-white px-8 py-4 ${RADIUS} font-black text-[11px] tracking-[0.2em] uppercase hover:bg-brand-primary transition-all active:scale-95 shadow-xl`}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
  
            {/* Left Side: Items list */}
            <div className="flex-1 space-y-8">
              {cart.map((item, index) => (
                <div key={item.id || index} className="flex gap-6 pb-8 border-b border-slate-100 group">
                  <div className={`w-32 h-40 bg-white ${RADIUS} overflow-hidden flex-shrink-0 border border-slate-100`}>
                    <img 
                      src={item.image} 
                      // Accessibility: Descriptive Alt Tag
                      alt={`${item.name} - ${item.category} collection`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-black text-brand-dark uppercase tracking-tight">
                          {item.name}
                        </h3>
                        <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest mt-1">
                          {item.category}
                        </p>
                      </div>
                      <p className="text-lg font-black text-brand-dark">{SYMBOL}{item.price}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className={`flex items-center gap-4 px-4 py-2 border border-slate-200 ${RADIUS}`}>
                        <button
                          type="button" // Accessibility: Button Type
                          onClick={() => updateItemQuantity(item.id, 'dec')}
                          className="text-slate-400 font-bold hover:text-brand-dark"
                          aria-label={`Decrease quantity of ${item.name}`} // Screen reader support
                        >-</button>
                        
                        <span className="text-sm font-black text-brand-dark" aria-live="polite">
                          {item.quantity || 1}
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => updateItemQuantity(item.id, 'inc')} 
                          className="text-slate-400 font-bold hover:text-brand-dark"
                          aria-label={`Increase quantity of ${item.name}`}
                        >+</button>
                      </div>
                      
                      <button  
                        type="button"
                        onClick={() => removeCartItem(item.id)}
                        className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] hover:opacity-70 transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Order Summary */}
            <div className="w-full lg:w-[380px]">
              <div className={`bg-white ${RADIUS} p-8 sticky top-24 border border-slate-100 shadow-sm`}>
                <h2 className="text-xl font-black text-brand-dark uppercase tracking-tighter mb-8">
                  Order Summary
                </h2>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Subtotal</span>
                    <span className="text-lg font-black text-brand-dark">{SYMBOL}{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Delivery</span>
                    <span className="text-sm font-black text-brand-primary uppercase tracking-widest">
                      {deliveryFee === 0 ? 'Free' : `${SYMBOL}${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="h-px bg-slate-100 my-2" aria-hidden="true"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-brand-dark uppercase tracking-wider">Total</span>
                    <span className="text-2xl font-black text-brand-dark tracking-tighter">
                      {SYMBOL}{totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button 
                  type="button"
                  className={`w-full bg-brand-dark text-white mt-10 py-5 ${RADIUS} font-black text-[11px] tracking-[0.2em] uppercase hover:bg-brand-primary transition-all active:scale-95 shadow-xl`}
                >
                  Proceed to Checkout
                </button>
                <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-6">
                  Secure Checkout • Lucknow Fast Delivery
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;