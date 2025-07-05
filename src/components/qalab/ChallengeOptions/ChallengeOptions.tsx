import React from 'react';
import { Grid, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Botão customizado para desafios
const ChallengeButton = styled('button')(({theme}) => ({
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    }
}));

// Opção de cor para desafios de contraste
const ColorOption = styled('div')<{ bg: string; fg: string }>(({ bg, fg }) => ({
    padding: '12px',
    borderRadius: '4px',
    backgroundColor: bg,
    color: fg,
    cursor: 'pointer',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.02)'
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
        <Grid container spacing={2}>
            {challenge.type === 'contrast' ? (
                challenge.options.map((opt, i) => (
                    <Grid item xs={6} md={3} key={i}>
                        <ColorOption
                            bg={opt.bg}
                            fg={opt.fg}
                            onClick={() => onOptionClick(i)}
                            style={{
                                border: bugFound && i === challenge.solution ? '2px solid #4caf50' : undefined,
                                opacity: bugFound && i !== challenge.solution ? 0.5 : 1
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
                                border: bugFound && i === challenge.solution ? '2px solid #4caf50' : undefined,
                                opacity: bugFound && i !== challenge.solution ? 0.5 : 1
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