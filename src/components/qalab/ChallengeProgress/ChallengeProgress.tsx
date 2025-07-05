import React from 'react';
import { Box, Typography, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

// Estilização do container de progresso
const ProgressContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1]
}));

// Estilização da barra de progresso
const StyledProgress = styled(LinearProgress)(({theme}) => ({
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.palette.grey[200],
    '& .MuiLinearProgress-bar': {
        borderRadius: 4,
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
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
        <ProgressContainer>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Desafio {currentChallenge + 1} de {totalChallenges}
            </Typography>
            <StyledProgress 
                variant="determinate" 
                value={progress} 
                sx={{ width: '100%', mb: 1 }}
            />
            <Typography variant="caption" color="text.secondary">
                {completedChallenges} de {totalChallenges} completados
            </Typography>
        </ProgressContainer>
    );
};

export default ChallengeProgress; 