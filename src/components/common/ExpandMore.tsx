import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import React from 'react';

interface ExpandMoreProps {
  expanded?: boolean;
  onClick?: () => void;
  dataTestId?: string;
}

// Componente reutilizável de expandir/colapsar, usado em vários lugares
// Para usar: <ExpandMore dataTestId="nome-unico" />
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expanded, onClick, dataTestId, ...other } = props;
  return (
    <IconButton
      onClick={onClick}
      className={expanded ? 'expanded' : ''}
      data-test-id={dataTestId}
      {...other}
    />
  );
})(({ theme }) => ({
  transform: 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  '&.expanded': {
    transform: 'rotate(180deg)',
  },
  '&:hover': {
    backgroundColor: theme.palette.grey[400] + ' !important',
  }
}));

export default ExpandMore; 