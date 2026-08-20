/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.12)',
      },
      colors: {
        ink: {
          950: '#020617',
        },
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.18), transparent 35%), radial-gradient(circle at top right, rgba(99, 102, 241, 0.16), transparent 28%)',
      },
    },
  },
  plugins: [],
};
