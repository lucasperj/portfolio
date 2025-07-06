import React from 'react';
import { Grid, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Botão customizado para desafios com design moderno
const ChallengeButton = styled('button')<{ 
    isCorrect: boolean; 
    isWrong: boolean; 
    attempts: number;
}>(({ theme, isCorrect, isWrong, attempts }) => ({
    padding: theme.spacing(2, 3),
    backgroundColor: theme.palette.background.paper,
    color: '#E0E0E0',
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(1.5),
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontSize: '1rem',
    fontWeight: 500,
    minHeight: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    lineHeight: 1.4,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    position: 'relative',
    overflow: 'hidden',
    
    // Hover roxo
    '&:hover': {
        backgroundColor: '#9C27B0',
        borderColor: '#9C27B0',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 16px rgba(156, 39, 176, 0.3)',
        color: '#FFFFFF'
    },
    
    // Estado correto (verde)
    ...(isCorrect && {
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        borderColor: '#4CAF50',
        color: '#4CAF50',
        fontWeight: 600,
        transform: 'scale(1.05)',
        boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)'
    }),
    
    // Estado errado (amarelo piscando)
    ...(isWrong && attempts <= 3 && {
        animation: 'pulseYellow 0.6s ease-in-out',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        borderColor: '#FFC107',
        color: '#FFC107'
    }),
    
    // Estado errado após 3 tentativas (vermelho piscando)
    ...(isWrong && attempts > 3 && {
        animation: 'pulseRed 0.6s ease-in-out',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        borderColor: '#F44336',
        color: '#F44336'
    }),
    
    '&:active': {
        transform: 'translateY(0)',
    },
    '&:disabled': {
        cursor: 'default',
        opacity: 0.7,
        transform: 'none',
    },
    
    // Animações CSS
    '@keyframes pulseYellow': {
        '0%, 100%': {
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            borderColor: '#FFC107',
            color: '#FFC107'
        },
        '50%': {
            backgroundColor: 'rgba(255, 193, 7, 0.3)',
            borderColor: '#FFC107',
            color: '#FFC107'
        }
    },
    
    '@keyframes pulseRed': {
        '0%, 100%': {
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            borderColor: '#F44336',
            color: '#F44336'
        },
        '50%': {
            backgroundColor: 'rgba(244, 67, 54, 0.3)',
            borderColor: '#F44336',
            color: '#F44336'
        }
    }
}));

// Opção de cor para desafios de contraste com design melhorado
const ColorOption = styled('div')<{ bg: string; fg: string; isWrong: boolean; attempts: number }>(({ bg, fg, theme, isWrong, attempts }) => ({
    padding: theme.spacing(3, 4),
    borderRadius: theme.spacing(2),
    backgroundColor: bg,
    color: fg,
    cursor: 'pointer',
    textAlign: 'center',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minHeight: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 600,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    '&:hover': {
        transform: 'translateY(-3px) scale(1.03)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&:active': {
        transform: 'translateY(-1px) scale(1.01)',
    },
    
    // Estado errado (amarelo piscando)
    ...(isWrong && attempts <= 3 && {
        animation: 'pulseYellow 0.6s ease-in-out',
        backgroundColor: 'rgba(255, 193, 7, 0.9)',
        borderColor: '#FFC107',
        color: '#000000'
    }),
    
    // Estado errado após 3 tentativas (vermelho piscando)
    ...(isWrong && attempts > 3 && {
        animation: 'pulseRed 0.6s ease-in-out',
        backgroundColor: 'rgba(244, 67, 54, 0.9)',
        borderColor: '#F44336',
        color: '#FFFFFF'
    }),
    
    // Animações CSS
    '@keyframes pulseYellow': {
        '0%, 100%': {
            backgroundColor: 'rgba(255, 193, 7, 0.9)',
            borderColor: '#FFC107',
            color: '#000000'
        },
        '50%': {
            backgroundColor: 'rgba(255, 193, 7, 0.7)',
            borderColor: '#FFC107',
            color: '#000000'
        }
    },
    
    '@keyframes pulseRed': {
        '0%, 100%': {
            backgroundColor: 'rgba(244, 67, 54, 0.9)',
            borderColor: '#F44336',
            color: '#FFFFFF'
        },
        '50%': {
            backgroundColor: 'rgba(244, 67, 54, 0.7)',
            borderColor: '#F44336',
            color: '#FFFFFF'
        }
    }
}));

interface ChallengeOptionsProps {
    challenge: {
        type: string;
        options: any[];
        solution: number;
    };
    bugFound: boolean;
    attempts: number;
    wrongOption: number | null;
    onOptionClick: (index: number) => void;
}

const ChallengeOptions: React.FC<ChallengeOptionsProps> = ({ 
    challenge, 
    bugFound, 
    attempts,
    wrongOption,
    onOptionClick 
}) => {
    return (
        <Grid container spacing={3}>
            {(challenge.type === 'contrast' || challenge.type === 'button') ? (
                challenge.options.map((opt, i) => (
                    <Grid item xs={12} md={6} key={i}>
                        <ColorOption
                            bg={opt.bg}
                            fg={opt.fg}
                            isWrong={wrongOption === i}
                            attempts={attempts}
                            onClick={() => onOptionClick(i)}
                            style={{
                                border: bugFound && i === challenge.solution ? '3px solid #4caf50' : undefined,
                                opacity: bugFound && i !== challenge.solution ? 0.4 : 1,
                                transform: bugFound && i === challenge.solution ? 'scale(1.05)' : undefined,
                                boxShadow: bugFound && i === challenge.solution ? '0 8px 24px rgba(76, 175, 80, 0.3)' : undefined
                            }}
                            data-test-id={challenge.type === 'button' && i === 1 ? 'incorrect-button' : `challenge-option-${i}`}
                        >
                            {opt.label}
                        </ColorOption>
                    </Grid>
                ))
            ) : (
                challenge.options.map((opt, i) => (
                    <Grid item xs={12} md={6} key={i}>
                        <ChallengeButton
                            isCorrect={bugFound && i === challenge.solution}
                            isWrong={wrongOption === i}
                            attempts={attempts}
                            onClick={() => onOptionClick(i)}
                            disabled={bugFound}
                            data-test-id={challenge.type === 'button' && i === 1 ? 'incorrect-button' : `challenge-option-${i}`}
                        >
                            {opt.label}
                        </ChallengeButton>
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default ChallengeOptions; 