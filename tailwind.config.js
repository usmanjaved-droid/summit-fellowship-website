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
      backgroundImage: {
        'alpine-lake': 'linear-gradient(135deg, #005C8A 0%, #1A7BA8 50%, #2D8FC4 100%)',
        'skardu-horizon': 'linear-gradient(to right, #D62828 0%, #D62828 40%, #8C847C 60%, #005C8A 100%)',
        'forest-shadow': 'linear-gradient(180deg, #2D4F1E 0%, #1A3A10 100%)',
      },
    },
  },
  plugins: [],
};
