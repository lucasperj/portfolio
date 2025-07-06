import React from 'react';
import { Box, Typography, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CelebrationIcon from '@mui/icons-material/Celebration';
import InfoIcon from '@mui/icons-material/Info';

// Estilização do card de sucesso
const SuccessCard = styled(Paper)(({theme}) => ({
    padding: theme.spacing(4),
    background: `linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)`,
    border: `2px solid ${theme.palette.success.main}`,
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(3),
    boxShadow: '0 8px 32px rgba(76, 175, 80, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
    }
}));

// Seção de informação
const InfoSection = styled(Box)(({theme}) => ({
    padding: theme.spacing(3),
    backgroundColor: 'rgba(156, 39, 176, 0.05)',
    borderRadius: theme.spacing(1.5),
    border: `1px solid rgba(156, 39, 176, 0.2)`,
    marginTop: theme.spacing(2)
}));

interface ChallengeSuccessProps {
    challenge: {
        title: string;
        explanation: string;
    };
    attempts: number;
    isLastChallenge: boolean;
    onNext: () => void;
    onReset: () => void;
}

const ChallengeSuccess: React.FC<ChallengeSuccessProps> = ({
    challenge,
    attempts,
    isLastChallenge,
    onNext,
    onReset
}) => {
    return (
        <SuccessCard elevation={0}>
            {/* Cabeçalho de sucesso */}
            <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
                <CelebrationIcon sx={{ 
                    fontSize: '2.5rem', 
                    color: 'success.main', 
                    mr: 2,
                    filter: 'drop-shadow(0 2px 4px rgba(76, 175, 80, 0.3))'
                }} />
                <Typography 
                    variant="h5" 
                    color="success.main" 
                    sx={{ 
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #4CAF50, #66BB6A)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    Parabéns! Você encontrou o bug em {attempts} {attempts === 1 ? 'tentativa' : 'tentativas'}
                </Typography>
            </Box>

            {/* Explicação do desafio */}
            <InfoSection>
                <Box display="flex" alignItems="center" mb={2}>
                    <InfoIcon sx={{ color: 'secondary.main', mr: 1 }} />
                    <Typography variant="h6" color="secondary.main" sx={{ fontWeight: 600 }}>
                        Explicação:
                    </Typography>
                </Box>
                <Typography 
                    variant="body1" 
                    sx={{ 
                        lineHeight: 1.6, 
                        color: '#E0E0E0',
                        fontSize: '1.1rem'
                    }}
                >
                    {challenge.explanation}
                </Typography>
            </InfoSection>

            {/* Botões */}
            <Box display="flex" justifyContent="center" gap={2} mt={4}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={onReset}
                    sx={{ 
                        minWidth: 140,
                        py: 1,
                        px: 3,
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        borderWidth: 2,
                        '&:hover': {
                            borderWidth: 2,
                            backgroundColor: 'rgba(156, 39, 176, 0.1)'
                        }
                    }}
                >
                    Refazer
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={onNext}
                    sx={{ 
                        minWidth: 160,
                        py: 1,
                        px: 3,
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        boxShadow: '0 4px 16px rgba(156, 39, 176, 0.3)',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(156, 39, 176, 0.4)'
                        }
                    }}
                >
                    {isLastChallenge ? 'Finalizar' : 'Próximo'}
                </Button>
            </Box>
        </SuccessCard>
    );
};

export default ChallengeSuccess; 