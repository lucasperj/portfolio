import React from 'react';
import { Box, Typography, Button, IconButton, Tooltip, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from 'framer-motion';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTranslation } from '../../../i18n/useTranslation';

// Estilização do card de resultados com design moderno
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
    overflow: 'visible',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, #4caf50, #9c27b0)`,
        borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
    }
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
            <StyledPaper elevation={0}>
                <Tooltip title={t('quality.reset')} placement="right">
                    <IconButton
                        onClick={onReset}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            zIndex: 10,
                            color: 'primary.main',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: 3,
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 1)',
                                color: 'secondary.main',
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            p: 1
                        }}
                        data-test-id="challenge-reset-button"
                    >
                        <RefreshIcon fontSize="medium" />
                    </IconButton>
                </Tooltip>
                
                <Box 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center" 
                    justifyContent="center" 
                    minHeight={250}
                    textAlign="center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <EmojiEventsIcon 
                            sx={{ 
                                fontSize: 80, 
                                color: 'success.main', 
                                mb: 3,
                                filter: 'drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3))'
                            }} 
                        />
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Typography 
                            variant="h4" 
                            color="success.main" 
                            gutterBottom
                            sx={{ 
                                fontWeight: 700,
                                background: `linear-gradient(45deg, #4caf50, #9c27b0)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}
                        >
                            {t('quality.congrats')}
                        </Typography>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Typography 
                            color="text.secondary" 
                            sx={{ 
                                mb: 3, 
                                fontSize: '1.1rem',
                                lineHeight: 1.6,
                                maxWidth: '500px'
                            }}
                        >
                            {`${t('quality.stats')}: ${totalAttempts.length} desafios (${calculateAverageAttempts()} tentativas em média)`}
                        </Typography>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onRestart}
                            sx={{ 
                                mt: 2, 
                                minWidth: 200,
                                py: 1.5,
                                px: 4,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                                }
                            }}
                        >
                            {t('quality.restart')}
                        </Button>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                    >
                        <Box mt={4} display="flex" gap={2}>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<LinkedInIcon />}
                                href="https://www.linkedin.com/in/lucasfalcaoqa/"
                                target="_blank"
                                sx={{
                                    py: 1.5,
                                    px: 3,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    borderWidth: 2,
                                    '&:hover': {
                                        borderWidth: 2,
                                        transform: 'translateY(-1px)',
                                    }
                                }}
                            >
                                {t('quality.linkedin')}
                            </Button>
                        </Box>
                    </motion.div>
                </Box>
            </StyledPaper>
        </motion.div>
    );
};

export default ChallengeResults; 