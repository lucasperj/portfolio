// Importações de componentes do Material-UI, ícones, hooks e animações
import { Box, Container, Grid, Typography, Paper, Collapse, IconButton, Button, Tooltip } from "@mui/material"
import { styled } from "@mui/material/styles"
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
import { challengesData } from './qualityChallengesData';

// ========================================
// INTERFACES PARA TIPAGEM DOS COMPONENTES
// ========================================
// QualityTopic: representa um tópico teórico de qualidade
// OptionType: representa as opções de resposta dos desafios (pode ser cor, label, etc)

export interface QualityTopic {
  title: string;
  icon: React.ElementType;
  description: string;
  keyPoints: string[];
}

export type OptionType =
  | { bg: string; fg: string; text: string } // Opção de cor (usado em contraste)
  | { label: string; value: string; type: string; pattern?: string } // Opção com label e valor
  | { label: string; value: string; pattern: string; type?: string } // Opção com pattern
  | { label: string } // Opção simples (usado em button)
  | { label: string; value: string }; // Opção com label e value (usado em form)

// Estilização da área de skills (tópicos teóricos)
const StyledSkills = styled("div")(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10, 0),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(5, 0),
    }
}));

// Estilização dos cards de tópicos e desafios
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

// Componente para exibir cada tópico teórico de qualidade
// Recebe um tópico e exibe título, descrição e pontos-chave, com opção de expandir/colapsar
const QualityCard = ({ topic }: { topic: QualityTopic }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <StyledPaper elevation={3}>
            <Box display="flex" alignItems="center" mb={isExpanded ? 2 : 0}>
                <topic.icon className="sectionIcon" />
                <Box flex={1}>
                    <Typography variant="h6" color="primary.contrastText">
                        {topic.title}
                    </Typography>
                </Box>
                {/* Botão para expandir/colapsar o card */}
                <ExpandMore
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={isExpanded ? 'expanded' : ''}
                    aria-expanded={isExpanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </Box>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Box mt={2}>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                        {topic.description}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                        {topic.keyPoints.map((point, index) => (
                            <Typography 
                                key={index} 
                                component="li" 
                                color="text.secondary"
                                sx={{ mb: 1 }}
                            >
                                {point}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Collapse>
        </StyledPaper>
    );
};

// Componente principal da seção de Qualidade
const Quality = () => {
    // Estados para controle dos desafios e feedbacks
    // bugFound: se o usuário já encontrou o bug
    // attempts: número de tentativas no desafio atual
    // currentChallenge: índice do desafio atual
    // showFinalMessage: exibe mensagem final ao terminar todos desafios
    // totalAttempts: array com tentativas de cada desafio
    // error: mensagem de erro para feedback
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
    const qualityTopics: QualityTopic[] = [
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

    // ========================================
    // MONTAGEM DINÂMICA DOS DESAFIOS
    // ========================================
    // Esta função transforma os dados estruturais dos desafios (challengesData)
    // em desafios completos com textos traduzidos conforme o idioma atual
    // 
    // challengesData: contém apenas a estrutura (tipo, solução, opções vazias)
    // challenges: resultado final com todos os textos traduzidos
    const challenges = challengesData.map((data, idx) => {
        // ========================================
        // TRATAMENTO DAS OPÇÕES POR TIPO DE DESAFIO
        // ========================================
        // Cada tipo de desafio tem uma estrutura diferente de opções
        // que precisa ser tratada de forma específica para internacionalização
        
        let options = data.options; // Inicializa com as opções estruturais
        
        // ========================================
        // TIPO: BUTTON (Desafio 0 - Data-testid)
        // ========================================
        // Opções simples: apenas labels traduzidos
        // Exemplo: "Opção 1", "Opção 2", etc.
        if (data.type === 'button') {
            options = [
                { label: t('quality.challenges.0.options.0') }, // "Opção 1"
                { label: t('quality.challenges.0.options.1') }, // "Opção 2"
                { label: t('quality.challenges.0.options.2') }, // "Opção 3"
                { label: t('quality.challenges.0.options.3') }, // "Opção 4"
            ];
        } 
        // ========================================
        // TIPO: CONTRAST (Desafio 1 - Acessibilidade)
        // ========================================
        // Opções com cores + texto traduzido
        // Estrutura: { bg: "#color", fg: "#color", text: "texto traduzido" }
        else if (data.type === 'contrast') {
            options = data.options.map((opt, i) => ({ 
                ...opt, // Mantém bg e fg (cores)
                text: t(`quality.challenges.1.options.${i}`) // Adiciona texto traduzido
            }));
        } 
        // ========================================
        // TIPO: CODE OU MULTIPLE (Desafios 2,3,4,5,7,8,9)
        // ========================================
        // Opções com código HTML ou múltipla escolha
        // Estrutura: { label: "texto traduzido" }
        else if (data.type === 'code' || data.type === 'multiple') {
            options = data.options.map((opt, i) => ({ 
                ...opt, // Mantém outras propriedades (type, etc)
                label: t(`quality.challenges.${idx}.options.${i}`) // Adiciona label traduzido
            }));
        } 
        // ========================================
        // TIPO: FORM (Desafio 6 - Validação)
        // ========================================
        // Opções com label e value separados
        // Estrutura: { label: "Campo", value: "Valor inválido" }
        else if (data.type === 'form') {
            options = data.options.map((opt, i) => ({ 
                ...opt, // Mantém outras propriedades (type, pattern, etc)
                label: t(`quality.challenges.${idx}.options.${i}.label`), // "Email", "Telefone", etc.
                value: t(`quality.challenges.${idx}.options.${i}.value`)  // "user@domain.com", "123-456-789", etc.
            }));
        }

        // ========================================
        // MONTAGEM DA EXPLICAÇÃO
        // ========================================
        // A explicação pode ser string simples ou JSX complexo
        // Por enquanto, usa apenas string traduzida
        // Para JSX complexo, pode-se customizar por tipo/índice específico
        let explanation: React.ReactNode = t(`quality.challenges.${idx}.explanation`);
        
        // Exemplo de como seria com JSX customizado:
        // if (idx === 3) { // Desafio de Performance
        //     explanation = (
        //         <Box>
        //             <Typography>{t(`quality.challenges.${idx}.explanation`)}</Typography>
        //             <List>
        //                 <ListItem>{t('quality.challenges.3.metrics.lcp')}</ListItem>
        //                 <ListItem>{t('quality.challenges.3.metrics.fid')}</ListItem>
        //             </List>
        //         </Box>
        //     );
        // }

        // ========================================
        // RETORNO DO DESAFIO COMPLETO
        // ========================================
        // Monta o objeto final do desafio com todos os textos traduzidos
        // Mantém a estrutura original (type, solution) + textos dinâmicos
        return {
            title: t(`quality.challenges.${idx}.title`),           // Título do desafio
            description: t(`quality.challenges.${idx}.description`), // Descrição do cenário
            hint: t(`quality.challenges.${idx}.hint`),             // Dica para o usuário
            type: data.type,                                       // Tipo (button, contrast, code, etc)
            solution: data.solution,                               // Índice da resposta correta
            options,                                               // Opções traduzidas (tratadas acima)
            explanation,                                           // Explicação traduzida
        };
    });

    // Função chamada ao clicar em uma opção de desafio
    // Atualiza tentativas, verifica solução e controla feedback
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
    // Atualiza tentativas totais e faz scroll automático
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

    // Calcula a média de tentativas por desafio
    const calculateAverageAttempts = () => {
        const total = totalAttempts.reduce((acc, curr) => acc + curr, 0);
        return (total / totalAttempts.length).toFixed(1);
    };

    // Renderiza o desafio atual conforme o tipo (button, contrast, code, etc)
    // Permite flexibilidade para novos tipos de desafios
    const renderChallenge = () => {
        const challenge = challenges[currentChallenge];

        switch (challenge.type) {
            case "contrast":
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        {challenge.options?.map((option: OptionType, index) => (
                            'bg' in option && 'fg' in option ? (
                                <ColorOption
                                    key={index}
                                    bg={option.bg}
                                    fg={option.fg}
                                    onClick={() => handleOptionClick(index)}
                                >
                                    {option.text}
                                </ColorOption>
                            ) : null
                        ))}
                    </Box>
                );
            case "button":
                return (
                    <Box display="flex" gap={2} flexWrap="wrap">
                        <ChallengeButton 
                            onClick={() => handleOptionClick(0)} 
                            data-testid="button-1"
                        >
                            Opção 1
                        </ChallengeButton>
                        <ChallengeButton 
                            onClick={() => handleOptionClick(1)} 
                            data-testid="incorrect-button"
                        >
                            Opção 2
                        </ChallengeButton>
                        <ChallengeButton 
                            onClick={() => handleOptionClick(2)} 
                            data-testid="button-3"
                        >
                            Opção 3
                        </ChallengeButton>
                        <ChallengeButton 
                            onClick={() => handleOptionClick(3)} 
                            data-testid="button-4"
                        >
                            Opção 4
                        </ChallengeButton>
                    </Box>
                );
            case "code":
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        {challenge.options?.map((option, index) => (
                            <ChallengeButton
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                sx={{
                                    fontFamily: 'monospace',
                                    textAlign: 'left',
                                    whiteSpace: 'pre-wrap',
                                    padding: '12px',
                                    backgroundColor: theme => theme.palette.background.paper,
                                    '&:hover': {
                                        backgroundColor: theme => theme.palette.action.hover
                                    }
                                }}
                            >
                                {'label' in option ? option.label : ''}
                            </ChallengeButton>
                        ))}
                    </Box>
                );
            case "multiple":
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        {challenge.options?.map((option, index) => (
                            <ChallengeButton
                                key={index}
                                onClick={() => handleOptionClick(index)}
                            >
                                {'label' in option ? option.label : ''}
                            </ChallengeButton>
                        ))}
                    </Box>
                );
            case "form":
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        {challenge.options?.map((option: OptionType, index) => (
                            'label' in option && 'value' in option ? (
                                <ChallengeButton
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                >
                                    {`${option.label}: ${option.value}`}
                                </ChallengeButton>
                            ) : null
                        ))}
                    </Box>
                );
            default:
                return null;
        }
    };

    // Dentro do componente Quality, função para reiniciar os desafios
    const restartChallenges = () => {
        setShowFinalMessage(false);
        setBugFound(false);
        setAttempts(0);
        setCurrentChallenge(0);
        setTotalAttempts([]);
        setTimeout(() => {
            exercitarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    };

    // Renderização principal da seção
    return (
        <StyledSkills id="quality">
            <Container maxWidth="lg">
                {!showFinalMessage ? (
                    <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h2" color="primary.contrastText" textAlign="center" gutterBottom>
                            {t('quality.title')}
                        </Typography>
                        <Typography variant="h5" color="text.secondary" textAlign="center" mb={6}>
                            {t('quality.subtitle')}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        {qualityTopics.map((topic, index) => (
                            <QualityCard key={index} topic={topic} />
                        ))}
                    </Grid>

                        <Grid item xs={12}>
                            <Box 
                                ref={exercitarRef}
                                textAlign="center" 
                                mb={6}
                                sx={{
                                    background: theme => theme.palette.background.default,
                                    p: 3,
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    maxWidth: '800px',
                                    margin: '0 auto'
                                }}
                            >
                                <Typography 
                                    variant="h4" 
                                    color="primary.contrastText"
                                    sx={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 2
                                    }}
                                >
                                    {t('quality.exercise.title')} 🎯
                                </Typography>
                                <Typography 
                                    variant="subtitle1" 
                                    color="text.secondary"
                                    sx={{ mt: 1 }}
                                >
                                    {t('quality.exercise.subtitle')}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <StyledPaper elevation={3}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                                    <Box display="flex" alignItems="center">
                                        <BugReportIcon className="sectionIcon" />
                                        <Typography variant="h6" color="primary.contrastText" textAlign="left">
                                            {t('quality.challenge.title')} #{currentChallenge + 1}
                                        </Typography>
                                    </Box>
                                    {currentChallenge > 0 && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={goToPreviousChallenge}
                                            startIcon={<RefreshIcon />}
                                            sx={{ 
                                                minWidth: '200px',
                                                py: 1,
                                                borderRadius: 2,
                                                boxShadow: 2,
                                                '&:hover': {
                                                    backgroundColor: 'secondary.dark'
                                                }
                                            }}
                                        >
                                            {t('quality.challenge.back')}
                                        </Button>
                                    )}
                                </Box>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                            <Typography variant="h6" color="primary.contrastText" gutterBottom textAlign="left">
                                                {challenges[currentChallenge].title}
                            </Typography>
                            <Typography color="text.secondary" sx={{ mb: 2 }}>
                                                {challenges[currentChallenge].description}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {renderChallenge()}
                                        </Grid>
                                    </Grid>

                                    {bugFound ? (
                                        <Box mt={2}>
                                            <Box p={2} bgcolor="success.main" borderRadius={1}>
                                                <Typography color="white">
                                                    {t('quality.success')} 🎉 {attempts} {attempts === 1 ? t('quality.attempt') : t('quality.attempts')}!
                                                </Typography>
                                            </Box>
                                            <Box mt={2} p={2} bgcolor={theme => theme.palette.background.paper} borderRadius={1}>
                                                <Typography variant="subtitle1" color="primary.contrastText" gutterBottom>
                                                    {t('quality.explanation')}
                                                </Typography>
                                                <Typography color="text.secondary">
                                                    {challenges[currentChallenge].explanation}
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={resetChallenge}
                                                    startIcon={<RefreshIcon />}
                                                    sx={{ mt: 2 }}
                                                >
                                                    {t('quality.next')}
                                                </Button>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <>
                                            <Typography color="text.secondary" sx={{ mt: 2, fontStyle: 'normal' }}>
                                                {t('quality.hint')} {challenges[currentChallenge].hint}
                            </Typography>
                                            {attempts >= 3 && (
                                                <Box>
                            <Typography 
                                                        color="warning.main" 
                                                        sx={{ 
                                                            mt: 2, 
                                                            mb: 1,
                                                            fontStyle: 'normal'
                                                        }}
                                                    >
                                                        {t('quality.difficulty')} {t('quality.study')} ✈️
                                                    </Typography>
                                                    <Button
                                                        variant="contained"
                                                        color="warning"
                                                        onClick={tryAnotherChallenge}
                                                        startIcon={<RefreshIcon />}
                                sx={{ 
                                                            mt: 1,
                                                            bgcolor: 'warning.main',
                                                            color: 'warning.contrastText',
                                                            '&:hover': {
                                                                bgcolor: 'warning.dark'
                                                            }
                                                        }}
                                                    >
                                                        {t('quality.try')}
                                                    </Button>
                                                </Box>
                                            )}
                                        </>
                                    )}

                                    {error && (
                                        <Box 
                                            mt={2} 
                                            p={2} 
                                            bgcolor="error.main" 
                                            borderRadius={1}
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                        >
                                            <ErrorIcon color="inherit" />
                                            <Typography color="white">
                                                {error}
                                            </Typography>
                                        </Box>
                                    )}

                                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                        <Typography color="text.secondary">
                                            {t('quality.attempts_count')} {attempts}
                            </Typography>
                                    </Box>
                                </Box>
                        </StyledPaper>
                    </Grid>
                </Grid>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <StyledPaper ref={finalCardRef} elevation={3} sx={{ position: 'relative', overflow: 'visible' }}>
                            {/* Botão de reset no canto superior esquerdo, apenas ícone, com tooltip */}
                            <Tooltip title={t('quality.reset')} placement="right">
                                <IconButton
                                    onClick={restartChallenges}
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
                            <Box textAlign="center" py={4}>
                                <motion.div
                                    animate={{ 
                                        rotate: [0, 10, -10, 10, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    <CelebrationIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                                </motion.div>
                                
                                <Typography variant="h4" color="primary.contrastText" gutterBottom>
                                    {t('quality.congratulations')} 🎉 {t('quality.complete')}!
                                </Typography>

                                <Box my={4}>
                                    <EmojiEventsIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                                    <Typography variant="h6" color="warning.main" gutterBottom>
                                        {t('quality.statistics')}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        {t('quality.average')} {calculateAverageAttempts()}
                                    </Typography>
                                </Box>

                                <Typography variant="body1" color="text.secondary" paragraph>
                                    {t('quality.journey')}
                                </Typography>

                                <Typography variant="body1" color="text.secondary" paragraph>
                                    {t('quality.continue')}
                                </Typography>

                                <Box mt={3} display="flex" justifyContent="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href="https://www.linkedin.com/in/lucas-falc%C3%A3o/"
                                        target="_blank"
                                        startIcon={<LinkedInIcon />}
                                        sx={{ minWidth: '250px', py: 1.5, fontSize: '1.1rem' }}
                                    >
                                        {t('quality.connect')}
                                    </Button>
                                </Box>
                            </Box>
                        </StyledPaper>
                    </motion.div>
                )}
            </Container>
        </StyledSkills>
    );
};

export default Quality;