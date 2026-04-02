 import React, { useState, useMemo } from "react";
// products import hataya kyunki hum useProducts hook use kar rahe hain
import { useCart } from "../context/CartContext";
import Hero from "../components/layout/Hero/Hero";
import ProductCard from "../components/common/ProductCard";
import {
  HiOutlineAdjustments,
  HiOutlineX,
  HiOutlineSearch,
} from "react-icons/hi";
import { CART_CONFIG } from "../utils/config";
import { useProducts } from "../context/ProductContext";

function Home() {
  const { products, loading } = useProducts();
  const { searchTerm, setSearchTerm } = useCart(); 
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
  const { RADIUS,APP_NAME } = CART_CONFIG; 
 
  const categories = ["All", ...new Set((products || []).map((p) => p.category))]; // Dynamically generate categories from products, with "All" as the default category

  const filteredProducts = useMemo(() => { // useMemo to optimize filtering of products based on search term and selected category, recalculating only when these dependencies change
    const cleanSearch = searchTerm.toLowerCase().trim();
    return (products || []).filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(cleanSearch) ||
        product.category.toLowerCase().includes(cleanSearch) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(cleanSearch));

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, products]); 

  const trendingProducts = useMemo(() => (products || []).slice(0, 4), [products]); // useMemo to get the first 4 products for the trending section, recalculating only when the products array changes

  const FilterList = () => (  // Component to render the list of category filter buttons, with styling based on whether the category is currently selected
    <div className="flex flex-col gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => {
            setSelectedCategory(cat);
            setIsDrawerOpen(false);
          }}
          className={`px-6 py-4 ${RADIUS} text-[10px] font-black uppercase tracking-widest transition-all text-left
            ${
              selectedCategory === cat
                ? "bg-brand-dark text-white shadow-xl translate-x-2"
                : "bg-brand-surface text-slate-500 hover:bg-slate-100"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );

//
  if (loading) return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest">Loading {APP_NAME}Cart...</div>;

  return (
  
    <div className="bg-white min-h-screen relative overflow-x-hidden">
      <Hero products={products} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="lg:hidden mb-8 text-left">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className={`flex items-center gap-2 bg-brand-surface px-5 py-3 ${RADIUS} font-black text-[10px] uppercase tracking-widest text-brand-dark`}
          >
            <HiOutlineAdjustments size={18} /> Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-28 h-fit">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">
              Browse Categories
            </h3>
            <FilterList />
          </aside>

          <main className="flex-1 min-w-0">
            <div className="mb-12 flex justify-between items-baseline border-b border-slate-100 pb-6">
              <h2 className="text-3xl font-black text-brand-dark tracking-tighter uppercase">
                {selectedCategory}{" "}
                <span className="text-brand-primary">Products</span>
              </h2>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {filteredProducts.length} Items Found
              </span>
            </div>

            {filteredProducts.length > 0 ? ( 
              <div className="space-y-24">
              
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {filteredProducts.length === 1 && (
                  <div className="pt-16 border-t border-slate-100">
                    <div className="mb-10 text-left">
                      <h3 className="text-xl font-black text-brand-dark uppercase tracking-tighter">
                        More from{" "}
                        <span className="text-brand-primary">
                          {filteredProducts[0].category}
                        </span>
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {(products || [])
                        .filter(
                          (p) =>
                            p.category === filteredProducts[0].category &&
                            p.id !== filteredProducts[0].id,
                        )
                        .slice(0, 4)
                        .map((p) => (
                          <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-20">
                <div className="text-center py-20 bg-brand-surface rounded-[3rem] px-6">
                  <div className="flex justify-center mb-6 opacity-20">
                    <HiOutlineSearch size={60} />
                  </div>
                  <h3 className="text-xl font-black text-brand-dark uppercase tracking-tight mb-2">
                    {searchTerm ? `No results for "${searchTerm}"` : "Nothing found"}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchTerm("");
                    }}
                    className="mt-8 inline-flex bg-brand-dark text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Drawer and other UI stays same */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
          <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-[3rem] p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black uppercase tracking-tighter text-brand-dark">Filters</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 bg-brand-surface rounded-full">
                <HiOutlineX size={20} className="text-brand-dark" />
              </button>
            </div>
            <FilterList />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;