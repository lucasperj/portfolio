import React, { useState, useEffect } from 'react';
import { Fab, Zoom, Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={visible}>
      <Tooltip title="Voltar para o início" placement="left" data-test-id="scroll-to-top-tooltip">
        <Fab
          data-test-id="scroll-to-top-button"
          color="primary"
          aria-label="voltar para o início"
          onClick={handleClick}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 1300,
            backgroundColor: '#fff',
            color: '#7c3aed', // Roxo padrão
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            transition: 'background 0.2s, color 0.2s',
            '&:hover': {
              backgroundColor: '#7c3aed', // Roxo
              color: '#fff',
            },
          }}
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default ScrollToTopButton; 