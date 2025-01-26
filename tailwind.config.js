/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        secondary: "#64748b",
        background: "#1a1a1a",  
        "text-primary": "#ffffff",  
        "text-secondary": "#ffffff",  
    },
      boxShadow: {
        card: "0 4px 8px rgb(0 0 0 / 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
