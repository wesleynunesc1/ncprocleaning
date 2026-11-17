/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#091118',
          900: '#0d1720',
          800: '#142A3A',
          700: '#1e3b50',
          600: '#2c5370'
        },
        charcoal: {
          900: '#11161d',
          800: '#17232B',
          700: '#212f3a'
        },
        steel: {
          400: '#94a3b8',
          500: '#80909A',
          600: '#64748b'
        },
        accent: {
          teal: '#397F87',
          tealHover: '#2d676e',
          tealGlow: 'rgba(57, 127, 135, 0.25)',
          tealLight: 'rgba(57, 127, 135, 0.12)'
        },
        canvas: {
          light: '#f9f8f5',
          card: '#ffffff',
          accent: '#f2f0ea',
          border: 'rgba(0, 0, 0, 0.06)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif']
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px'
      }
    },
  },
  plugins: [],
}
