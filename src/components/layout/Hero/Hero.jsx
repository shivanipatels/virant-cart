import React, { useState, useEffect } from "react";
import { HiOutlineArrowNarrowRight, HiOutlineSparkles } from "react-icons/hi";
import { CART_CONFIG } from "../../../utils/config";

function Hero({ products = [] }) { 
  const [currentIndex, setCurrentIndex] = useState(0);// State to track the current index of the hero products being displayed
  const { RADIUS } = CART_CONFIG;

  // Safely slice the products array to get the first 5 items for the hero section, with a check to ensure products is an array and has items
  const heroProducts = products && products.length > 0 ? products.slice(0, 5) : [];

  useEffect(() => {
     if (heroProducts.length === 0) return;// If there are no hero products, do not set up the interval

     // Set up an interval to change the current index every 4 seconds, cycling back to the start when reaching the end of the hero products array

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === heroProducts.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);// Clean up the interval on component unmount or when heroProducts changes
  }, [heroProducts.length]);

   if (heroProducts.length === 0) {     // If there are no products to display in the hero section, show a loading placeholder
    return <div className="h-[50vh] lg:h-[65vh] w-full bg-gray-50 animate-pulse flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest text-[10px]">Loading Collection...</div>;
  }

  const currentItem = heroProducts[currentIndex]; // Get the current product item to display in the hero section based on the current index

  return (
    <div className="relative w-full min-h-[50vh] lg:h-[65vh] bg-brand-surface flex items-center overflow-hidden border-b border-gray-100">
      
      {/* Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[5%] right-[0%] w-[30%] h-[30%] bg-brand-secondary/10 rounded-full blur-[90px] opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-6 animate-bounce-subtle`}>
              <HiOutlineSparkles className="text-brand-primary" size={14} />
              <span className="text-[9px] font-black tracking-[0.2em] text-brand-dark uppercase">
                {currentItem?.category || "New Arrival"} {/* Added Safe Check */}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-black text-brand-dark leading-[0.85] tracking-tighter mb-6 uppercase">
              Style <br />
              <span className="italic text-brand-primary font-serif font-light tracking-normal lowercase">Evolved.</span>
            </h1>

            <p className="text-slate-500 text-xs md:text-base font-medium max-w-sm mx-auto lg:mx-0 mb-8 leading-relaxed">
              Experience the minimalist aesthetic with <strong>{currentItem?.name || "our latest collection"}</strong>. {/* Added Safe Check */}
            </p>

            <button className={`group relative bg-brand-dark text-white px-8 py-4 ${RADIUS} font-black text-[10px] tracking-widest overflow-hidden transition-all active:scale-95 shadow-xl`}>
              <span className="relative z-10 flex items-center justify-center gap-3">
                EXPLORE <HiOutlineArrowNarrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-brand-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:block w-full lg:w-1/2 relative order-1 lg:order-2">
            <div className={`relative mx-auto lg:ml-auto w-full max-w-[340px] aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-[8px] border-white bg-white`}>
              <img
                key={currentItem?.id} 
                src={currentItem?.image}
                alt={currentItem?.name}
                className="w-full h-full object-cover animate-fade-in"
              />
            </div>

            {/* Floating Info Card */}
            <div className={`absolute -bottom-4 -left-2 md:-left-8 p-4 rounded-[24px] shadow-2xl max-w-[200px] glass-effect animate-float`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-primary text-white rounded-xl flex items-center justify-center font-black text-base shadow-lg">V</div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Featured</p>
                  <p className="text-xs font-bold text-brand-dark truncate w-24">{currentItem?.name}</p> {/* Added Safe Check */}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;