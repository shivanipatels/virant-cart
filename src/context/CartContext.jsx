 import { createContext, useContext, useMemo, useState } from "react";
import { CART_CONFIG } from "../utils/config";


 const { FREE_DELIVERY, SHIPPING_FEE } = CART_CONFIG; 

const CartContext = createContext({
  cart: [],                  // Initial cart list state
  addToCart: (product) => {},  // Function to add a product to the cart
  removeCartItem: (id) => {},  // Function to remove a product from the cart by its ID
  updateItemQuantity: (id, type) => {},   // Function to update the quantity of a product in the cart
  subtotal: 0,        // Initial subtotal state
  deliveryFee: 0,     // Initial delivery fee state
  totalAmount: 0,     // Initial total amount state
  totalItems: 0,      // Initial total items state
  searchTerm: "",     // Initial search term state
  setSearchTerm: (term) => {},     // Function to update the search term
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);    //  State to hold the list of items in the cart
  const [searchTerm, setSearchTerm] = useState("");  // State to hold the current search term


  // useMemo to calculate total items, subtotal, delivery fee, and total amount whenever the cart changes
  const { totalItems, subtotal, deliveryFee, totalAmount } = useMemo(() => {
    const validCartItems = cart.filter(item => item !== null && item !== undefined);// Filter out any null or undefined items from the cart

    const totalItems = validCartItems.reduce(
      (total, product) => total + (product.quantity || 1),
      0,
    );

    const subtotal = validCartItems.reduce((acc, item) => {
      return acc + item.price * (item.quantity || 1);
    }, 0);

    const deliveryFee = subtotal > FREE_DELIVERY || subtotal === 0 ? 0 : SHIPPING_FEE;
    const totalAmount = subtotal + deliveryFee;

    return { totalItems, subtotal, deliveryFee, totalAmount };
  }, [cart]);


  // Function to add a product to the cart. It checks if the product already exists in the cart and updates the quantity accordingly. If the product does not exist, it adds it to the cart with a quantity of 1.
  const addToCart = (product) => {
    setCart((prevCartItem) => {
      const isExistingItem = prevCartItem.find((item) => item.id === product.id);
      if (isExistingItem) {
        return prevCartItem.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      } else {
        return [...prevCartItem, { ...product, quantity: 1 }];
      }
    });
  };


  // Function to remove a product from the cart by its ID. It filters out the item with the specified ID from the cart.
  const removeCartItem = (id) => {
    setCart((prevCartItem) => prevCartItem.filter((item) => item.id !== id));
  };


  // Function to update the quantity of a product in the cart. It takes the product ID and the type of update (increment or decrement) as parameters. It updates the quantity accordingly and removes the item if the quantity drops below 1.
  const updateItemQuantity = (id, type) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            if (type === "inc") {
              return { ...item, quantity: (item.quantity || 1) + 1 };
            } else if (type === "dec") {
              return item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : null;
            }
          }
          return item;
        })
        .filter(Boolean);
    });
  };


  //
  return (
    <CartContext.Provider value={{
      cart, addToCart, removeCartItem, updateItemQuantity,
      subtotal, deliveryFee, totalAmount, totalItems,
      searchTerm, setSearchTerm
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);