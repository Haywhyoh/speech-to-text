module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    colors: {
      bg: '#1D1D1D',
      'screen-color-inner': '#FFFFFF',
      'screen-color-outer': '#939393',
      'screen-edge-top': '#151515',
      'screen-edge-bottom': '#333333',
      'screen-text': '#000000',
      red: '#BA2525',
      neutral: '#CBCBCB',
      send: '#3CA02C',
      'shadow-bright': 'rgba(218, 218, 218, 0.07)',
      'shadow-dark': 'rgba(0, 0, 0, 0.25)',
    },
    extend: {
      fontFamily: {
        display: [
          '"7-Segment"',
          '"Neue Haas Grotesk Text Pro"',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
