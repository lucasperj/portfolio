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
    attempts?: number;
    showAttempts?: boolean;
}

const ChallengeProgress: React.FC<ChallengeProgressProps> = ({
    currentChallenge,
    totalChallenges,
    completedChallenges,
    attempts,
    showAttempts
}) => {
    const progress = (completedChallenges / totalChallenges) * 100;

    return (
        <Box sx={{ width: '100%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} sx={{ position: 'relative' }}>
                <Typography 
                    variant="body1" 
                    color="#FFFFFF" 
                    sx={{ fontWeight: 600 }}
                >
                    Desafio {currentChallenge + 1} de {totalChallenges}
                </Typography>
                
                {/* Contador de tentativas centralizado na mesma linha */}
                {showAttempts && attempts && attempts > 0 && (
                    <Typography 
                        variant="body1" 
                        color="#FFC107" 
                        sx={{ 
                            fontWeight: 600,
                            fontSize: '1rem',
                            textAlign: 'center',
                            padding: '8px 16px',
                            backgroundColor: 'rgba(255, 193, 7, 0.1)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 193, 7, 0.3)',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1
                        }}
                    >
                        {attempts} {attempts === 1 ? 'tentativa' : 'tentativas'}
                    </Typography>
                )}
                
                <Typography 
                    variant="body2" 
                    color="#E0E0E0"
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