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
      boxShadow: {
        canvas: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
      },
      borderColor: {
        layer: '#00D9E1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
