import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import React from 'react';

interface ExpandMoreProps {
  expanded?: boolean;
  onClick?: () => void;
  dataTestId?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any; // Permite outras props como sx, aria-label, etc
}

const ExpandMoreBase: React.FC<ExpandMoreProps> = ({
  expanded,
  onClick,
  dataTestId,
  className,
  children,
  ...other
}) => (
  <IconButton
    onClick={onClick}
    className={className + (expanded ? ' expanded' : '')}
    data-test-id={dataTestId}
    {...other}
  >
    {children}
  </IconButton>
);

const ExpandMore = styled(ExpandMoreBase)(({ theme }) => ({
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