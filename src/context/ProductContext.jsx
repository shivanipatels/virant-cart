import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext({
  products: [], // Initial state for the list of products
  loading: true, // Initial state for loading status
});

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        // --- COMPLETE MAPPING (No Confusion) ---
        console.log("Raw data received:", data); // Debugging log to check the structure of the received data
        const formattedProducts = data.products.map(item => {
          return {
            id: item.id,               
            name: item.title,           
            price: Math.round(item.price * 80),    
            image: item.thumbnail,     
            category: item.category,   
            description: item.description, 
             tags: item.tags || []      
          };
        });

        setProducts(formattedProducts);
        setLoading(false);
      })
      .catch(err => {
        console.error("Data nahi mila:", err);
        setLoading(false);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);