 import React, { createContext, useState, useContext } from 'react';

const WishlistContext = createContext(
  {
    wishlistItems: [], // List of items in the wishlist
    toggleWishlist: (product) => {}, // Function to add/remove item from wishlist
    isItemInWishlist: (id) => false, // Function to check if item is in wishlist
  }
);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]); // State to hold the list of items in the wishlist

  // Function to add or remove an item from the wishlist
  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        // If item already exists, remove it from wishlist
        return prev.filter((item) => item.id !== product.id);
      } else {
        // If item does not exist, add it to wishlist
        return [...prev, product];
      }
    });
  };

  // Function to check if an item is in the wishlist
  const isItemInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);  // Returns true if item is in wishlist, otherwise false
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isItemInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);