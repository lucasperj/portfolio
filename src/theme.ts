import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#f44336",
    },
    secondary: {
      main: "#3f51b5",  
    },
  },
  typography: {
    fontFamily: "Segoe UI",
  },
});

theme = responsiveFontSizes(theme);

export default theme;