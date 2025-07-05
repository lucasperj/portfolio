import React from 'react';
import { Grid, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Botão customizado para desafios com design moderno
const ChallengeButton = styled('button')(({theme}) => ({
    padding: theme.spacing(2, 3),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
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
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        borderColor: theme.palette.primary.main,
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
    },
    '&:active': {
        transform: 'translateY(0)',
    },
    '&:disabled': {
        cursor: 'default',
        opacity: 0.7,
        transform: 'none',
    }
}));

// Opção de cor para desafios de contraste com design melhorado
const ColorOption = styled('div')<{ bg: string; fg: string }>(({ bg, fg, theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1.5),
    backgroundColor: bg,
    color: fg,
    cursor: 'pointer',
    textAlign: 'center',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 500,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    '&:hover': {
        transform: 'translateY(-2px) scale(1.02)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    '&:active': {
        transform: 'translateY(0) scale(1)',
    }
}));

interface ChallengeOptionsProps {
    challenge: {
        type: string;
        options: any[];
        solution: number;
    };
    bugFound: boolean;
    onOptionClick: (index: number) => void;
}

const ChallengeOptions: React.FC<ChallengeOptionsProps> = ({ 
    challenge, 
    bugFound, 
    onOptionClick 
}) => {
    return (
        <Grid container spacing={3}>
            {challenge.type === 'contrast' ? (
                challenge.options.map((opt, i) => (
                    <Grid item xs={6} md={3} key={i}>
                        <ColorOption
                            bg={opt.bg}
                            fg={opt.fg}
                            onClick={() => onOptionClick(i)}
                            style={{
                                border: bugFound && i === challenge.solution ? '3px solid #4caf50' : undefined,
                                opacity: bugFound && i !== challenge.solution ? 0.4 : 1,
                                transform: bugFound && i === challenge.solution ? 'scale(1.05)' : undefined,
                                boxShadow: bugFound && i === challenge.solution ? '0 8px 24px rgba(76, 175, 80, 0.3)' : undefined
                            }}
                            data-test-id={`challenge-option-${i}`}
                        >
                            {opt.label}
                        </ColorOption>
                    </Grid>
                ))
            ) : (
                challenge.options.map((opt, i) => (
                    <Grid item xs={12} md={6} key={i}>
                        <ChallengeButton
                            onClick={() => onOptionClick(i)}
                            style={{
                                border: bugFound && i === challenge.solution ? '3px solid #4caf50' : undefined,
                                opacity: bugFound && i !== challenge.solution ? 0.4 : 1,
                                backgroundColor: bugFound && i === challenge.solution ? 'rgba(76, 175, 80, 0.1)' : undefined,
                                color: bugFound && i === challenge.solution ? '#4caf50' : undefined,
                                fontWeight: bugFound && i === challenge.solution ? 600 : undefined
                            }}
                            disabled={bugFound}
                            data-test-id={`challenge-option-${i}`}
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