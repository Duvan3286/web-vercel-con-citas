/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#A48A6F', // tono tierra principal
          700: '#7A634D', // tierra más oscuro
          DEFAULT: '#A48A6F',
          foreground: '#FFFFFF', // texto sobre tierra
        },
        secondary: {
          500: '#F0D9B5', // ámbar suave
          700: '#D1BFA0',
          DEFAULT: '#F0D9B5',
          foreground: '#3B3A36', // texto oscuro
        },
        accent: {
          500: '#4A6FA5', // azul de acento, solo detalles
          DEFAULT: '#4A6FA5',
          foreground: '#FFFFFF',
        },
        background: '#F5F1E7', // tierra claro
        foreground: '#3B3A36', // gris cálido
        card: '#FFFFFF',
        border: '#D6C6AD', // borde tierra suave
      },
      borderRadius: {
        xl: '1rem',
        lg: '0.75rem',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
