import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

// Componente base para exibir artigos em formato de carrossel (pode ser aprimorado depois)
const Articles = () => {
  return (
    <Box sx={{ width: '100%', py: 4 }}>
      <Typography variant="h4" color="primary.contrastText" gutterBottom>
        Artigos e Publicações Técnicas
      </Typography>
      {/* Carrossel de artigos será implementado aqui */}
      <Paper sx={{ p: 4, textAlign: 'center', minHeight: 200 }}>
        <Typography color="text.secondary">Em breve: carrossel de artigos!</Typography>
      </Paper>
    </Box>
  );
};

export default Articles; 