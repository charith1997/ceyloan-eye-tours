import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        red: '#CD1A40',
        orange: '#FF803C',
      },
      fontFamily: {
        water: ['"Water Brush"', 'cursive'],
        work: ['"Work Sans"', 'sans-serif'],
        carattere: ['"Carattere"', 'cursive'],
      },
      fontSize: {
        '64': '64px', // Adds 64px as a text size option
      },
      fontWeight: {
        '200': '200', // Ensures font-weight 200 is available
      }
    },
  },
  plugins: [],
};

export default config;