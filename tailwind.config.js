/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      transparent: 'rgba(255,255,255,0)',
      current: 'currentColor',
      white: {
        DEFAULT: '#ffffff',
        dark: '#F9F9F9',
      },
      black: '#000000',
      violet: {
        DEFAULT: '#5548D9',
        dark: '#333378',
      },
      red: {
        DEFAULT: '#EB1F1F',
        dark: '#AA0000',
      },
      teal: {
        DEFAULT: '#02999A',
        dark: '#085E6E',
      },
      charcoal: {
        DEFAULT: '#545859',
        dark: '#212621',
      },
      gray: {
        light: '#C8C8C8',
        DEFAULT: '#969696',
      },
    },
    fontFamily: {
      sans: '"AvenirNext", "OpenSans", Helvetica, Arial, system-ui, -apple-system, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      mono: '"SF Mono", monospace',
    },
    extend: {
      screens: {
        xs: '475px',
        '2xl': '1352px',
      },
      fontSize: {
        '3xl': '2rem',
        '4xl': '2.375rem',
      },
    },
  },
};
