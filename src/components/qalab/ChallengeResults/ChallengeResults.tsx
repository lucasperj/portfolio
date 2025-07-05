import React from 'react';
import { Box, Typography, Button, IconButton, Tooltip, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from 'framer-motion';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTranslation } from '../../../i18n/useTranslation';

// Estilização do card de resultados
const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
    overflow: 'visible'
}));

interface ChallengeResultsProps {
    totalAttempts: number[];
    onRestart: () => void;
    onReset: () => void;
}

const ChallengeResults: React.FC<ChallengeResultsProps> = ({ 
    totalAttempts, 
    onRestart, 
    onReset 
}) => {
    const { t } = useTranslation();

    // Calcula a média de tentativas
    const calculateAverageAttempts = () => {
        if (totalAttempts.length === 0) return 0;
        const sum = totalAttempts.reduce((acc, val) => acc + val, 0);
        return (sum / totalAttempts.length).toFixed(1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <StyledPaper elevation={3}>
                <Tooltip title={t('quality.reset')} placement="right">
                    <IconButton
                        onClick={onReset}
                        sx={{
                            position: 'absolute',
                            top: 44,
                            left: 44,
                            zIndex: 10,
                            color: 'primary.main',
                            background: '#fff',
                            boxShadow: 3,
                            '&:hover': {
                                background: '#f3eaff',
                                color: 'secondary.main',
                            },
                            p: 0.5
                        }}
                        data-test-id="challenge-reset-button"
                    >
                        <RefreshIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
                
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight={200}>
                    <EmojiEventsIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                    <Typography variant="h5" color="success.main" gutterBottom>
                        {t('quality.congrats')}
                    </Typography>
                    <Typography color="text.secondary" align="center" sx={{ mb: 2 }}>
                        {`${t('quality.stats')}: ${totalAttempts.length} (${calculateAverageAttempts()} média)`}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onRestart}
                        sx={{ mt: 2, minWidth: 180 }}
                    >
                        {t('quality.restart')}
                    </Button>
                    <Box mt={3} display="flex" gap={2}>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<LinkedInIcon />}
                            href="https://www.linkedin.com/in/lucasfalcaoqa/"
                            target="_blank"
                        >
                            {t('quality.linkedin')}
                        </Button>
                    </Box>
                </Box>
            </StyledPaper>
        </motion.div>
    );
};

export default ChallengeResults; 