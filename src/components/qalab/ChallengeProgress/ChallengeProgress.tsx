import React from 'react';
import { Box, Typography, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

// Estilização da barra de progresso com design moderno
const StyledProgress = styled(LinearProgress)(({theme}) => ({
    width: '100%',
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.palette.grey[200],
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
    '& .MuiLinearProgress-bar': {
        borderRadius: 6,
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    }
}));

interface ChallengeProgressProps {
    currentChallenge: number;
    totalChallenges: number;
    completedChallenges: number;
}

const ChallengeProgress: React.FC<ChallengeProgressProps> = ({
    currentChallenge,
    totalChallenges,
    completedChallenges
}) => {
    const progress = (completedChallenges / totalChallenges) * 100;

    return (
        <Box sx={{ width: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography 
                    variant="body1" 
                    color="primary.main" 
                    sx={{ fontWeight: 600 }}
                >
                    Desafio {currentChallenge + 1} de {totalChallenges}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                >
                    {completedChallenges} de {totalChallenges} completados
                </Typography>
            </Box>
            <StyledProgress 
                variant="determinate" 
                value={progress} 
                sx={{ width: '100%' }}
            />
        </Box>
    );
};

export default ChallengeProgress; 