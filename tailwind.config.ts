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
        // Refined Pure White, Soft Pista, Olive, and Deep Olive Palette
        brand: {
          bg: "#FFFFFF", // Pure White - Main background
          navbar: "#FFFFFF", // Pure White - Navbar
          primary: "#7B8052", // Olive Green - Primary CTA & Icons
          primaryDark: "#465239", // Deep Olive #465239 - CTA hover & Footer
          highlight: "#8FA36C", // Pista Green - Highlighted text
          pista: "#93C572", // Pista Green
          softPista: "#EAF2E3", // Soft Pista Green
          surface: "#FFFFFF", // Cards & primary surfaces
          border: "#E5E8E1", // Subtle border
          muted: "#666666", // Medium Grey - Paragraphs
          typography: "#000000", // Black - Main headings
          white: "#FFFFFF", // Pure White
        },
        clinic: {
          bg: "#FFFFFF",
          white: "#FFFFFF",
          surface: "#FFFFFF",
          softPista: "#EAF2E3",
          highlight: "#8FA36C",
          pista: "#93C572",
          olive: "#7B8052",
          deepOlive: "#465239",
          black: "#000000",
          mediumGrey: "#666666",
          border: "#E5E8E1",
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
