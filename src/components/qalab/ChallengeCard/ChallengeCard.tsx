import React from 'react';
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import BugReportIcon from '@mui/icons-material/BugReport';
import { ChallengeData } from '../../../pages/QALab/sections/Challenges/qualityChallengesData';

// Estilização do card de desafio com design moderno
const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(4),
    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    borderRadius: theme.spacing(2),
    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)`,
    border: `1px solid ${theme.palette.divider}`,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
    '& .sectionIcon': {
        fontSize: '2.5rem',
        color: theme.palette.primary.main,
        marginRight: theme.spacing(2),
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
    },
    '& .challenge-title': {
        fontWeight: 600,
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    '& .challenge-description': {
        lineHeight: 1.6,
        color: theme.palette.text.secondary,
        fontSize: '1.1rem'
    }
}));

interface ChallengeCardProps {
    challenge: ChallengeData & {
        title: string;
        description: string;
        options: any[];
    };
    children: React.ReactNode;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, children }) => {
    return (
        <StyledPaper elevation={0}>
            <Box display="flex" alignItems="center" mb={3}>
                <BugReportIcon className="sectionIcon" />
                <Typography variant="h5" className="challenge-title">
                    {challenge.title}
                </Typography>
            </Box>
            <Typography className="challenge-description" sx={{ mb: 3 }}>
                {challenge.description}
            </Typography>
            {children}
        </StyledPaper>
    );
};

export default ChallengeCard; 