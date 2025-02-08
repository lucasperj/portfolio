import { ThemeProvider } from "@mui/material"
import theme from "./theme"
import Home from "./pages/Home/Home"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from '@emotion/styled';

const StyledToastContainer = styled(ToastContainer)`
  &.Toastify__toast-container {
    margin-top: 80px; // Ajuste conforme a altura da sua navbar

    @media (max-width: 600px) {
      width: 90%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 70px; // Pode ajustar para mobile se necessário
    }
  }

  .Toastify__toast {
    border-radius: 8px;
    
    @media (max-width: 600px) {
      margin-bottom: 1rem;
      text-align: center;
    }
  }

  .Toastify__toast-body {
    @media (max-width: 600px) {
      justify-content: center;
    }
  }
`;

function App() {
  return (
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
  )
}

export default App
