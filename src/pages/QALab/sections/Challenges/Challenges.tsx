import { Box, Container, Grid, Typography, Paper, Collapse, IconButton, Button, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import BugReportIcon from '@mui/icons-material/BugReport';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandMore from '../../../../components/common/ExpandMore';
import { useState, useRef } from "react";
import { motion } from 'framer-motion';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ErrorIcon from '@mui/icons-material/Error';
import { useTranslation } from '../../../../i18n/useTranslation';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import { challengesData, ChallengeData } from './qualityChallengesData';

// Estilização dos cards de desafios
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

// Tipos auxiliares
export type OptionType =
  | { bg: string; fg: string; text: string }
  | { label: string; value: string; type: string; pattern?: string }
  | { label: string; value: string; pattern: string; type?: string }
  | { label: string }
  | { label: string; value: string };

// Componente principal dos desafios de qualidade
const Challenges = () => {
    // Estados para controle dos desafios e feedbacks
    const [bugFound, setBugFound] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [showFinalMessage, setShowFinalMessage] = useState(false);
    const [totalAttempts, setTotalAttempts] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Refs para scroll automático ao avançar/finalizar desafios
    const exercitarRef = useRef<HTMLDivElement>(null);
    const finalCardRef = useRef<HTMLDivElement>(null);

    // Hook de tradução para internacionalização dinâmica
    const { t } = useTranslation();

    // Monta os tópicos de qualidade dinamicamente para atualizar ao trocar idioma
    // Isso garante que a troca de idioma reflita imediatamente na UI
    const qualityTopics = [
        {
            title: t('quality.topics.0.title'),
            icon: IntegrationInstructionsIcon,
            description: t('quality.topics.0.description'),
            keyPoints: [
                t('quality.topics.0.keyPoints.0'),
                t('quality.topics.0.keyPoints.1'),
                t('quality.topics.0.keyPoints.2'),
                t('quality.topics.0.keyPoints.3'),
            ]
        },
        {
            title: t('quality.topics.1.title'),
            icon: SpeedIcon,
            description: t('quality.topics.1.description'),
            keyPoints: [
                t('quality.topics.1.keyPoints.0'),
                t('quality.topics.1.keyPoints.1'),
                t('quality.topics.1.keyPoints.2'),
                t('quality.topics.1.keyPoints.3'),
            ]
        },
        {
            title: t('quality.topics.2.title'),
            icon: SecurityIcon,
            description: t('quality.topics.2.description'),
            keyPoints: [
                t('quality.topics.2.keyPoints.0'),
                t('quality.topics.2.keyPoints.1'),
                t('quality.topics.2.keyPoints.2'),
                t('quality.topics.2.keyPoints.3'),
            ]
        }
    ];

    // Função chamada ao clicar em uma opção de desafio
    const handleOptionClick = async (index: number) => {
        try {
            if (!navigator.onLine) {
                setError(t('quality.error.offline'));
                return;
            }
            if (!bugFound) {
                setAttempts(prev => prev + 1);
            }
            if (index === challenges[currentChallenge].solution) {
                setBugFound(true);
            }
            setError(null);
        } catch (err) {
            setError(t('quality.error.generic'));
        }
    };

    // Avança para o próximo desafio ou mostra mensagem final
    const resetChallenge = () => {
        if (currentChallenge === challenges.length - 1) {
            setShowFinalMessage(true);
            setTotalAttempts(prev => [...prev, attempts]);
            setTimeout(() => {
                finalCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        } else {
            setBugFound(false);
            setAttempts(0);
            setCurrentChallenge(prev => prev + 1);
            setTotalAttempts(prev => [...prev, attempts]);
            setTimeout(() => {
                exercitarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    };

    // Permite tentar outro desafio após 3 tentativas
    const tryAnotherChallenge = () => {
        resetChallenge();
        setTimeout(() => {
            exercitarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    };

    // Volta para o desafio anterior
    const goToPreviousChallenge = () => {
        setBugFound(false);
        setAttempts(0);
        setCurrentChallenge((prev) => (prev - 1 + challenges.length) % challenges.length);
    };

    // Calcula a média de tentativas
    const calculateAverageAttempts = () => {
        if (totalAttempts.length === 0) return 0;
        const sum = totalAttempts.reduce((acc, val) => acc + val, 0);
        return (sum / totalAttempts.length).toFixed(1);
    };

    // Monta os desafios com textos traduzidos
    const challenges = challengesData.map((challenge, idx) => ({
        ...challenge,
        title: t(`quality.challenges.${idx}.title`),
        description: t(`quality.challenges.${idx}.description`),
        options: (challenge.options.length > 0
            ? challenge.options.map((opt, i) => ({
                ...opt,
                label: t(`quality.challenges.${idx}.options.${i}`)
            }))
            : [0,1,2,3].map(i => ({ label: t(`quality.challenges.${idx}.options.${i}`) }))
        )
    }));

    // Renderização do desafio atual
    const renderChallenge = () => {
        const challenge = challenges[currentChallenge];
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
                <Grid container spacing={2}>
                    {challenge.type === 'contrast' ? (
                        challenge.options.map((opt, i) => (
                            <Grid item xs={6} md={3} key={i}>
                                <ColorOption
                                    bg={opt.bg}
                                    fg={opt.fg}
                                    onClick={() => handleOptionClick(i)}
                                    style={{
                                        border: bugFound && i === challenge.solution ? '2px solid #4caf50' : undefined,
                                        opacity: bugFound && i !== challenge.solution ? 0.5 : 1
                                    }}
                                >
                                    {opt.label}
                                </ColorOption>
                            </Grid>
                        ))
                    ) : (
                        challenge.options.map((opt, i) => (
                            <Grid item xs={12} md={6} key={i}>
                                <ChallengeButton
                                    onClick={() => handleOptionClick(i)}
                                    style={{
                                        border: bugFound && i === challenge.solution ? '2px solid #4caf50' : undefined,
                                        opacity: bugFound && i !== challenge.solution ? 0.5 : 1
                                    }}
                                    disabled={bugFound}
                                >
                                    {opt.label}
                                </ChallengeButton>
                            </Grid>
                        ))
                    )}
                </Grid>
                {error && (
                    <Box mt={2} display="flex" alignItems="center" color="error.main">
                        <ErrorIcon sx={{ mr: 1 }} />
                        <Typography>{error}</Typography>
                    </Box>
                )}
                {bugFound && (
                    <Box mt={3} display="flex" flexDirection="column" alignItems="center">
                        <Typography color="success.main" variant="h6" gutterBottom>
                            <CelebrationIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                            {t('quality.success')}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={resetChallenge}
                            sx={{ mt: 2, minWidth: 180 }}
                        >
                            {currentChallenge === challenges.length - 1 ? t('quality.finish') : t('quality.next')}
                        </Button>
                    </Box>
                )}
            </StyledPaper>
        );
    };

    // Renderização final
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography variant="h3" color="primary.contrastText" align="center" gutterBottom>
                {t('quality.title')}
            </Typography>
            <Typography color="text.secondary" align="center" sx={{ mb: 4 }}>
                {t('quality.description')}
            </Typography>
            {/* Card de desafio atual */}
            <div ref={exercitarRef}>{renderChallenge()}</div>
            {/* Mensagem final ao concluir todos os desafios */}
            {showFinalMessage && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <StyledPaper ref={finalCardRef} elevation={3} sx={{ position: 'relative', overflow: 'visible' }}>
                        <Tooltip title={t('quality.reset')} placement="right">
                            <IconButton
                                onClick={() => {
                                    setBugFound(false);
                                    setAttempts(0);
                                    setCurrentChallenge(0);
                                    setShowFinalMessage(false);
                                    setTotalAttempts([]);
                                    setError(null);
                                    setTimeout(() => {
                                        exercitarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }, 300);
                                }}
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
                                onClick={() => {
                                    setBugFound(false);
                                    setAttempts(0);
                                    setCurrentChallenge(0);
                                    setShowFinalMessage(false);
                                    setTotalAttempts([]);
                                    setError(null);
                                    setTimeout(() => {
                                        exercitarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }, 300);
                                }}
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
            )}
        </Container>
    );
};

export default Challenges; 