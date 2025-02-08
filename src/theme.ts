import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#232730',
      light: '#484D5B',
      dark: '#16181F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#945DD6',
      light: '#B68EE3',
      dark: '#6E45A0',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#232730',
      paper: '#2C3140',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B4BE',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;