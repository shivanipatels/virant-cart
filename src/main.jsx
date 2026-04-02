import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", // Default page
        element: <Home />,
      },
      {
        path: "/cart", // Cart page
        element: <Cart />,
      },
      { path: "/product/:id", element: <ProductDetail /> }, // Dynamic Route
      { path: "/login", element: <Login /> }, // Login page
      { path: "/signup", element: <Signup /> }, // Signup page
      { path: "/wishlist", element: <Wishlist /> }, // Wishlist page
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductProvider>
      <WishlistProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </WishlistProvider>
    </ProductProvider>
  </StrictMode>,
);
