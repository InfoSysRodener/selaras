module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#3490dc',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
        'orange': '#F88E52',
        'selaras-black': '#201111'
       }),
       backgroundImage: {
        'exhibition': "url('~@/assets/bg-images/exhibition.svg')",
       },
       backdropBrightness: {
        25: '.25',
        160: '1.60',
        165: '1.65',
        170: '1.70',
        175: '1.75',
        180: '1.80',
        185: '1.85',
        190: '1.90',
      },
      letterSpacing: {
         tightest: '-.075em',
         tighter: '-.05em',
         tight: '-.025em',
         normal: '0',
         wide: '.025em',
         wider: '.1em',
         widest: '.25em',
      },
      textColor: {
        'orange': '#F88E52',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
