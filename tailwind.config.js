module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './src/**/components/**/*.jsx',
    './src/components/*.jsx',
  ],
  theme: {
    inset: {
      '0': 0,
      auto: 'auto',
      '1': '2px',
      '2': '4px',
      '3': '6px',
      '4': '8px',
      '5': '10px',
      '6': '12px',
    },
    extend: {
      colors: {
        lightgreen: "#d2d710",
        darkyellow: "#d5cc3e"
      },
      transitionProperty: {
        "width": "width"
      }
    },
  },
  variants: {},
  plugins: [],
}
