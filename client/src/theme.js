import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    // Style augmentation for the CssBaseline component
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#211951',
          // backgroundColor: 'white',
        },
      },
    },
  },
  palette: {
    // Define your color scheme here
    primary: {
      main: '#836FFF',
      light: "#F0F3FF",
      dark: "#211951"
    },
    secondary: {
      main: '#15F5BA',
    },
  },
  typography: {
    fontFamily: [
      'Russo One',
      'sans-serif' // Fallback to monospace if "Anonymous Pro" is not available
    ].join(','),
    fontSize: 14,
  },
});

export default theme;
