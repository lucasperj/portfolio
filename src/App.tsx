import { ThemeProvider } from "@mui/material"
import theme from "./theme"
import Home from "./pages/Home/Home"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from '@emotion/styled';
import { LanguageProvider } from './i18n/LanguageContext';

const StyledToastContainer = styled(ToastContainer)`
  &.Toastify__toast-container {
    margin-top: 80px;

    @media (max-width: 600px) {
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 70px;
    }
  }

  .Toastify__toast {
    border-radius: 8px;
    
    @media (max-width: 600px) {
      margin-bottom: 1rem;
      text-align: center;
      font-size: 14px;
      padding: 12px;
    }
  }

  .Toastify__toast-body {
    @media (max-width: 600px) {
      justify-content: center;
      gap: 8px;
    }
  }

  .Toastify__toast-icon {
    @media (max-width: 600px) {
      width: 20px;
      height: 20px;
    }
  }
`;

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider theme={theme}>
        <StyledToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Home />
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
