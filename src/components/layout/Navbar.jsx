 import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { HiOutlineSearch, HiOutlineShoppingBag, HiOutlineMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { FiHeart } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CART_CONFIG } from '../../utils/config';
// import { products } from '../../data/products';
import { useProducts } from '../../context/ProductContext';

function Navbar() {
  const { products } = useProducts();
  const { totalItems, searchTerm, setSearchTerm } = useCart(); // Accessing totalItems, searchTerm, and setSearchTerm from CartContext
  const { wishlistItems } = useWishlist();  // Accessing wishlistItems from WishlistContext
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility
  const [suggestions, setSuggestions] = useState([]); // State to manage search suggestions

  const [showDropdown, setShowDropdown] = useState(false); // State to manage visibility of the search suggestions dropdown
  
  const [displaySearch, setDisplaySearch] = useState(searchTerm); // Local state to manage the search input value for debouncing and controlling the input field separately from the global searchTerm

  const { APP_NAME, RADIUS } = CART_CONFIG;
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {  // Effect to manage body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
     return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  // ----------------------------------------------

  useEffect(() => {  // Effect to debounce the search input and update the global searchTerm after a delay
    const timer = setTimeout(() => {
      setSearchTerm(displaySearch);
    }, 400); 
    return () => clearTimeout(timer);
  }, [displaySearch, setSearchTerm]);

  useEffect(() => {  // Effect to filter products based on the searchTerm and update suggestions
    const cleanSearch = searchTerm.trim().toLowerCase();
    if (cleanSearch.length > 1) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(cleanSearch) ||
        p.category.toLowerCase().includes(cleanSearch)
      ).slice(0, 6);
      
      setSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [searchTerm]);

  useEffect(() => {  // Effect to handle clicks outside the search dropdown and mobile menu to close them
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          mobileRef.current && !mobileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectProduct = (product) => {  // Function to handle selection of a product from the search suggestions, updating the search input and navigating to the product page
    setDisplaySearch(product.name);
    setSearchTerm(product.name);
    setShowDropdown(false);
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <nav className="sticky top-0 z-[60] bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-brand-dark">
            <HiOutlineMenuAlt3 size={26} />
          </button>

          <Link to="/" className="flex-shrink-0 cursor-pointer">
            <h1 className="text-xl md:text-2xl font-black tracking-tighter text-brand-dark uppercase">
              {APP_NAME}<span className="text-brand-primary">.</span>
            </h1>
          </Link>

          <div className="hidden md:flex flex-1 relative group max-w-xl mx-4" ref={dropdownRef}>
            <HiOutlineSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary" />
            <input 
              type="text" 
              placeholder="Search for products..."
              value={displaySearch}
              onChange={(e) => setDisplaySearch(e.target.value)}
              onFocus={() => displaySearch.length > 1 && setShowDropdown(true)}
              className={`w-full bg-gray-100 border-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20 ${RADIUS} py-2.5 px-11 outline-none text-sm font-medium transition-all`}
            />

            {showDropdown && suggestions.length > 0 && (
              <div className={`absolute top-full left-0 right-0 mt-2 bg-white shadow-2xl border border-gray-100 overflow-hidden z-[70] ${RADIUS}`}>
                {suggestions.map((item) => (
                  <button key={item.id} onClick={() => handleSelectProduct(item)} className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-none text-left">
                    <img src={item.image} alt="" className="w-10 h-10 object-cover rounded-lg bg-gray-100" />
                    <div>
                      <p className="text-[11px] font-black text-brand-dark uppercase tracking-tight">{item.name}</p>
                      <p className="text-[9px] text-brand-primary font-bold uppercase">{item.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-5">
            <div className="hidden md:flex items-center gap-4 border-r border-gray-100 pr-5 mr-1">
              <Link to="/login" className="text-[11px] font-black tracking-widest uppercase text-slate-400 hover:text-brand-primary">Login</Link>
              <Link to="/signup" className={`px-5 py-2.5 ${RADIUS} text-[10px] font-black tracking-widest uppercase bg-brand-dark text-white hover:bg-brand-primary shadow-lg`}>Sign Up</Link>
            </div>

            <Link to="/wishlist" className="relative p-2 text-gray-500 hover:text-brand-secondary">
              <FiHeart size={22} fill={location.pathname === '/wishlist' ? "#fb7185" : "none"} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-secondary text-white text-[9px] font-black h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className={`relative p-3 ${RADIUS} bg-brand-dark hover:bg-brand-primary transition-all`}>
              <HiOutlineShoppingBag size={20} className="text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="md:hidden px-4 pb-4 relative" ref={mobileRef}>
          <div className="relative group w-full">
            <HiOutlineSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..."
              value={displaySearch}
              onChange={(e) => setDisplaySearch(e.target.value)}
              onFocus={() => displaySearch.length > 1 && setShowDropdown(true)}
              className={`w-full bg-gray-100 border-none ${RADIUS} py-3 px-11 outline-none text-xs font-bold transition-all`}
            />
          </div>
          {showDropdown && suggestions.length > 0 && (
            <div className={`absolute top-full left-4 right-4 mt-1 bg-white shadow-2xl border border-gray-100 z-[70] ${RADIUS}`}>
              {suggestions.map((item) => (
                <button key={item.id} onClick={() => handleSelectProduct(item)} className="w-full flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-none text-left">
                  <img src={item.image} alt="" className="w-9 h-9 object-cover rounded-md bg-gray-100" />
                  <div>
                    <p className="text-[10px] font-black text-brand-dark uppercase truncate">{item.name}</p>
                    <p className="text-[8px] text-brand-primary font-bold uppercase">{item.category}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute inset-y-0 left-0 w-80 bg-white shadow-2xl flex flex-col p-8 transform transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-center mb-10">
               <h2 className="text-xl font-black tracking-tighter uppercase text-brand-dark">Menu</h2>
               <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><HiOutlineX size={24} /></button>
            </div>
            <nav className="flex flex-col gap-6">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark">Home</Link>
              <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark">Wishlist</Link>
              <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="text-xs font-black uppercase tracking-[0.2em] text-brand-dark">My Bag</Link>
            </nav>
            <div className="mt-auto border-t border-gray-100 pt-8 space-y-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full border-2 py-3.5 text-center font-black text-[11px] tracking-widest uppercase border-brand-dark rounded-xl">Login</Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block w-full py-4 text-center font-black text-[11px] tracking-widest uppercase bg-brand-dark text-white rounded-xl shadow-xl">Create Account</Link>
            </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;