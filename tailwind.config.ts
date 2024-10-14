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
        primary: '#1a202c', // Dark Blue-Grey
        secondary: '#2d3748', // Medium Dark Grey
        accent: '#38b2ac',    // Teal (more vibrant)
        highlight: '#f6ad55', // Warm Orange for highlights
        muted: '#a0aec0',     // Muted Grey for subtle text
        background: '#edf2f7', // Light Grayish Background
        info: '#3182ce',      // Blue for information
        success: '#48bb78',   // Green for success states
        warning: '#f6e05e',   // Yellow for warnings
        danger: '#e53e3e',    // Red for errors
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'], // Clean, modern sans-serif for body text
        display: ['Poppins', 'sans-serif'], // Stylish sans-serif for headings
        mono: ['Fira Code', 'monospace'], // Monospace for code snippets or technical parts
        serif: ['Merriweather', 'serif'], // Serif font for elegant text, e.g., quotes
      },
      spacing: {
        '72': '18rem',    // Smaller custom spacing
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',   // Original extended spacing
        '144': '36rem',
        '160': '40rem',   // New larger spacing
        '192': '48rem',
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)', // Light shadow for subtle depth
        'custom-dark': '0 6px 8px rgba(0, 0, 0, 0.25)', // Darker shadow for more emphasis
      },
      borderRadius: {
        'sm': '0.125rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '1rem',    // Smooth, rounded corners
        '2xl': '1.5rem',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },
    }
    
  },
  plugins: [],
};
export default config;
