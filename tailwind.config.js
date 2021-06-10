module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        tab: '#AAACAD',
      },
      backgroundColor: {
        'tab-active': '#293039',
        menu: '#0E1318',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
