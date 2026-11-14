import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Refined Warm Cream and Olive Palette
        brand: {
          bg: "#F5F0E6", // Warm Cream - Primary background
          primary: "#7B8052", // Olive - Primary highlighting color
          primaryDark: "#555B38", // Deep Olive - Hover states & darker accents
          primaryLight: "#959B6B",
          typography: "#29291F", // Dark Charcoal - Headings & body
          surface: "#FAF8F2", // Soft Cream - Secondary surfaces & alternate cards
          muted: "#A5A786", // Muted Olive - Decorative lines & subtle borders
          white: "#FFFFFF", // Pure White
        },
        clinic: {
          bg: "#F5F0E6",
          white: "#FAF8F2",
          warm: "#F5F0E6",
          olive: "#7B8052",
          deepOlive: "#555B38",
          charcoal: "#29291F",
          softCream: "#FAF8F2",
          mutedOlive: "#A5A786",
          border: "#E0DACB",
        },
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        body: ["var(--font-inter)", "Inter", "Lato", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "Lato", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        subtle: "0 2px 8px rgba(41, 41, 31, 0.05), 0 1px 2px rgba(41, 41, 31, 0.03)",
        card: "0 10px 28px -4px rgba(41, 41, 31, 0.12), 0 20px 48px -8px rgba(41, 41, 31, 0.14)",
        float: "0 16px 40px -4px rgba(123, 128, 82, 0.28)",
        elevated: "0 20px 40px -6px rgba(41, 41, 31, 0.18), 0 32px 64px -12px rgba(41, 41, 31, 0.22)",
      },
      borderRadius: {
        card: "22px",
        "card-sm": "14px",
        "card-lg": "32px",
      },
    },
  },
  plugins: [],
};

export default config;
