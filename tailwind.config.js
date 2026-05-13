/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'lake-dark': '#005C8A',      // Deep Lake Blue
        'forest-dark': '#2D4F1E',    // Lush Evergreen
        'terra-red': '#D62828',      // Terracotta Red
        'slate-warm': '#8C847C',     // Skardu Slate
        'cloud-white': '#F4F7F6',    // Cloud White
        'moss-light': '#7BA428',     // Sunlit Moss
      },
    },
  },
  plugins: [],
};
