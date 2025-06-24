import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

// Tema padrão (Home)
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
  zIndex: {
    modal: 1300,
    tooltip: 1100
  },
});

// Tema QA Lab revisado
export const themeQALab = createTheme({
  palette: {
    primary: {
      main: green[800], // Verde escuro
      light: green[200],
      dark: green[700], // Um pouco mais claro que o 900
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#945DD6',
      light: '#B68EE3',
      dark: '#7C3CCF', // Roxo um pouco mais claro
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#232730', // Escuro igual home
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
      color: '#FFFFFF',
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#FFFFFF',
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    body1: {
      color: '#FFFFFF',
    },
    body2: {
      color: '#FFFFFF',
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
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#2C3140',
          color: '#FFFFFF',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2C3140',
          color: '#FFFFFF',
        },
      },
    },
  },
  zIndex: {
    modal: 1300,
    tooltip: 1100
  },
});

export default theme;