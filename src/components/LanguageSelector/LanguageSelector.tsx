import { useContext, useState, useRef } from 'react';
import { LanguageContext } from '../../i18n/LanguageContext';
import { Select, MenuItem, styled, Box } from '@mui/material';

// Estilização customizada do Select para o botão de idioma
// O fundo e a cor mudam conforme hover ou aberto
const StyledSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== 'isactive',
})<{
  isactive?: string;
}>(({ theme, isactive }) => ({
  backgroundColor: isactive === 'true' ? theme.palette.secondary.main : theme.palette.background.paper,
  border: `2px solid ${theme.palette.primary.contrastText}`,
  borderRadius: '16px',
  color: isactive === 'true' ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText,
  fontWeight: 600,
  fontSize: '0.92rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  minWidth: 90,
  height: 40,
  transition: 'all 0.2s',
  '& .MuiSelect-select': {
    padding: '8px 20px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.92rem',
  },
  '& fieldset': {
    border: 'none',
  },
}));

// Estilização customizada dos itens do dropdown
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  margin: '4px 8px',
  fontSize: '0.92rem',
  '&.Mui-selected': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));

// Componente do seletor de idioma
const LanguageSelector = () => {
  // Contexto global de idioma
  const { language, setLanguage } = useContext(LanguageContext);
  // Estado para controlar abertura do dropdown
  const [open, setOpen] = useState(false);
  // Estado para hover (para mudar cor do botão)
  const [hover, setHover] = useState(false);
  // Ref para o Box externo (pode ser usado para lógica de clique fora, se necessário)
  const boxRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown e remove hover
  const handleMouseLeave = () => {
    setHover(false);
    setOpen(false);
  };

  // Abre o dropdown e ativa hover
  const handleMouseEnter = () => {
    setHover(true);
    setOpen(true);
  };

  // Define se o botão está ativo (hover ou aberto)
  const isActive = open || hover;

  return (
    // Wrapper para controlar hover/leave do botão e do menu
    <Box
      ref={boxRef}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      display="inline-block"
    >
      {/* Select customizado para trocar idioma */}
      <StyledSelect
        value={language}
        onChange={e => setLanguage(e.target.value as string)}
        size="small"
        variant="outlined"
        disableUnderline
        IconComponent={() => null} // Remove o ícone de colapsável
        sx={{ ml: 2 }}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        isactive={isActive ? 'true' : 'false'}
        onMouseEnter={handleMouseEnter}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: '#1a1a1a',
              borderRadius: 16,
              marginTop: 8,
            },
            onMouseLeave: handleMouseLeave,
          },
        }}
      >
        {/* Opções de idioma */}
        <StyledMenuItem value="pt">Português</StyledMenuItem>
        <StyledMenuItem value="en">English</StyledMenuItem>
        <StyledMenuItem value="es">Español</StyledMenuItem>
      </StyledSelect>
    </Box>
  );
};

export default LanguageSelector; 