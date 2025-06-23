import { useContext, useState, useRef } from 'react';
import { LanguageContext } from '../../i18n/LanguageContext';
import { Select, MenuItem, styled, Box } from '@mui/material';

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

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown se o mouse sair do botão OU do menu
  const handleMouseLeave = () => {
    setHover(false);
    setOpen(false);
  };

  const handleMouseEnter = () => {
    setHover(true);
    setOpen(true);
  };

  const isActive = open || hover;

  return (
    <Box
      ref={boxRef}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      display="inline-block"
    >
      <StyledSelect
        value={language}
        onChange={e => setLanguage(e.target.value as string)}
        size="small"
        variant="outlined"
        disableUnderline
        IconComponent={() => null}
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
        <StyledMenuItem value="pt">Português</StyledMenuItem>
        <StyledMenuItem value="en">English</StyledMenuItem>
        <StyledMenuItem value="es">Español</StyledMenuItem>
      </StyledSelect>
    </Box>
  );
};

export default LanguageSelector; 