import React from 'react';
// Importa os componentes de roteamento do React Router v6
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importa as páginas principais
import HomePage from './pages/HomePage';
import QALabPage from './pages/QALabPage';
import { ThemeProvider } from "@mui/material"
import theme from "./theme"
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

// Componente principal da aplicação
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            {/* Rota da Home/Portfólio */}
            <Route path="/" element={<HomePage />} />
            {/* Rota do QA Lab */}
            <Route path="/qalab" element={<QALabPage />} />
            {/* Futuras rotas podem ser adicionadas aqui, ex: artigos, projetos, etc */}
          </Routes>
        </BrowserRouter>
        <StyledToastContainer />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
