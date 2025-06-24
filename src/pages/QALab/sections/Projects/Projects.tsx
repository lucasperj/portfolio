import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

// Componente base para exibir projetos do QA Lab
const Projects = () => {
  return (
    <Box sx={{ width: '100%', py: 4 }}>
      <Typography variant="h4" color="primary.contrastText" gutterBottom>
        Projetos de Automação e Ferramentas
      </Typography>
      {/* Lista de projetos será implementada aqui */}
      <Paper sx={{ p: 4, textAlign: 'center', minHeight: 200 }}>
        <Typography color="text.secondary">Em breve: projetos de automação!</Typography>
      </Paper>
    </Box>
  );
};

export default Projects; 