/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#4f46e5",   //  Indigo
          secondary: "#fb7185", // Wishlist Rose
          dark: "#0f172a",      // Buttons Slate-900
          accent: "#6366f1",    // Hover effect
          surface: "#fafafa",   // Background
        }
      }
    },
  },
  plugins: [],
}