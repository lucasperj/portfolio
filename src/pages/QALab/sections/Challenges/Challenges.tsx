import { Box, Container, Typography, Button, Collapse } from "@mui/material";
import { useState, useRef } from "react";
import { motion } from 'framer-motion';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ErrorIcon from '@mui/icons-material/Error';
import { useQALabTranslation } from '../../../../i18n/useQALabTranslation';
import { challengesData, ChallengeData } from './qualityChallengesData';

// Importação dos componentes modulares
import ChallengeCard from '../../../../components/qalab/ChallengeCard';
import ChallengeOptions from '../../../../components/qalab/ChallengeOptions';
import ChallengeResults from '../../../../components/qalab/ChallengeResults';
import ChallengeProgress from '../../../../components/qalab/ChallengeProgress';

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
    const { t } = useQALabTranslation();

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

    // Função para reiniciar o jogo
    const handleRestart = () => {
        setBugFound(false);
        setAttempts(0);
        setCurrentChallenge(0);
        setShowFinalMessage(false);
        setTotalAttempts([]);
        setError(null);
        setTimeout(() => {
            exercitarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    };

    // Função para resetar o jogo
    const handleReset = () => {
        handleRestart();
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
            <ChallengeCard challenge={challenge}>
                {/* Barra de progresso integrada dentro do card */}
                <Box mb={3}>
                    <ChallengeProgress
                        currentChallenge={currentChallenge}
                        totalChallenges={challenges.length}
                        completedChallenges={totalAttempts.length}
                    />
                </Box>
                
                <ChallengeOptions
                    challenge={challenge}
                    bugFound={bugFound}
                    onOptionClick={handleOptionClick}
                />
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
            </ChallengeCard>
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
            <div ref={exercitarRef}>
                {renderChallenge()}
            </div>
            
            {/* Mensagem final ao concluir todos os desafios */}
            {showFinalMessage && (
                <div ref={finalCardRef}>
                    <ChallengeResults
                        totalAttempts={totalAttempts}
                        onRestart={handleRestart}
                        onReset={handleReset}
                    />
                </div>
            )}
        </Container>
    );
};

export default Challenges; 