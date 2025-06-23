import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

// Componente reutilizável de expandir/colapsar, usado em vários lugares
const ExpandMore = styled(IconButton)(({ theme }) => ({
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