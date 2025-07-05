import React from 'react';
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import BugReportIcon from '@mui/icons-material/BugReport';
import { ChallengeData } from '../../../pages/QALab/sections/Challenges/qualityChallengesData';

// Estilização do card de desafio
const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    '& .sectionIcon': {
        fontSize: '2rem',
        color: theme.palette.primary.main,
        marginRight: theme.spacing(2)
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
        <StyledPaper elevation={3}>
            <Box display="flex" alignItems="center" mb={2}>
                <BugReportIcon className="sectionIcon" />
                <Typography variant="h6" color="primary.contrastText">
                    {challenge.title}
                </Typography>
            </Box>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
                {challenge.description}
            </Typography>
            {children}
        </StyledPaper>
    );
};

export default ChallengeCard; 