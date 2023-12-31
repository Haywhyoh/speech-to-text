module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    colors: {
      bg: '#1D1D1D',
      'screen-edge-top': '#151515',
      'screen-edge-bottom': '#333333',
      'screen-text': '#000000',
      buttonRed: 'var(--buttonRed)',
      neutral: 'var(--neutral)',
      send: 'var(--send)',
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
