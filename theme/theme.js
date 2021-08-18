import { extendTheme } from 'native-base';

const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#FCE4EC',
        100: '#F8BBD0',
        200: '#F48FB1',
        300: '#F06292',
        400: '#EC407A',
        500: '#E91E63',
        600: '#D81B60',
        700: '#C2185B',
        800: '#AD1457',
        900: '#880E4F',
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'light',
    },
});

export default theme;