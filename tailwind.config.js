module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      aspectRatio: {
        '16/9': [16, 9],
      },
    },
  },
  plugins: [],
};
