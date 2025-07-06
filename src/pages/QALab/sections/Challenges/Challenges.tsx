import { Box, Container, Typography, Button } from "@mui/material";
import { useState, useRef } from "react";
import ErrorIcon from '@mui/icons-material/Error';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useQALabTranslation } from '../../../../i18n/useQALabTranslation';
import { challengesData } from './qualityChallengesData';

// Importação dos componentes modulares
import ChallengeCard from '../../../../components/qalab/ChallengeCard';
import ChallengeOptions from '../../../../components/qalab/ChallengeOptions';
import ChallengeResults from '../../../../components/qalab/ChallengeResults';
import ChallengeProgress from '../../../../components/qalab/ChallengeProgress';
import ChallengeSuccess from '../../../../components/qalab/ChallengeSuccess/ChallengeSuccess';

// Componente principal dos desafios de qualidade
const Challenges = () => {
    // Estados para controle dos desafios e feedbacks
    const [bugFound, setBugFound] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [showFinalMessage, setShowFinalMessage] = useState(false);
    const [totalAttempts, setTotalAttempts] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [wrongOption, setWrongOption] = useState<number | null>(null);

    // Refs para scroll automático ao avançar/finalizar desafios
    const exercitarRef = useRef<HTMLDivElement>(null);
    const finalCardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    // Hook de tradução para internacionalização dinâmica
    const { t } = useQALabTranslation();

    // Função chamada ao clicar em uma opção de desafio
    const handleOptionClick = async (index: number) => {
        try {
            if (!navigator.onLine) {
                setError(t('quality.error.offline'));
                return;
            }
            
            if (bugFound) return; // Não permite cliques após acertar
            
            if (index === challenges[currentChallenge].solution) {
                setBugFound(true);
                setWrongOption(null);
                setAttempts(prev => prev + 1); // Adiciona a tentativa que acertou
            } else {
                setAttempts(prev => prev + 1);
                setWrongOption(index);
                // Remove o efeito de piscar após 0.6 segundos
                setTimeout(() => {
                    setWrongOption(null);
                }, 600);
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
            setWrongOption(null);
            setCurrentChallenge(prev => prev + 1);
            setTotalAttempts(prev => [...prev, attempts]);
            setTimeout(() => {
                console.log('Scrolling to title:', titleRef.current);
                titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    };

    // Função para reiniciar o jogo
    const handleRestart = () => {
        setBugFound(false);
        setAttempts(0);
        setWrongOption(null);
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
        explanation: t(`quality.challenges.${idx}.explanation`),
        hint: t(`quality.challenges.${idx}.hint`),
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
            <ChallengeCard 
                challenge={challenge}
                progressComponent={
                    <ChallengeProgress
                        currentChallenge={currentChallenge}
                        totalChallenges={challenges.length}
                        completedChallenges={totalAttempts.length}
                    />
                }
                attemptsCounter={
                    attempts > 0 && !bugFound ? (
                        <Typography 
                            variant="body2" 
                            color="#E0E0E0" 
                            sx={{ 
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                opacity: 0.8
                            }}
                        >
                            {attempts} {attempts === 1 ? 'tentativa' : 'tentativas'}
                        </Typography>
                    ) : undefined
                }
                backButton={
                    currentChallenge > 0 ? (
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                setBugFound(false);
                                setAttempts(0);
                                setWrongOption(null);
                                setCurrentChallenge(prev => prev - 1);
                                setTimeout(() => {
                                    console.log('Scrolling to title:', titleRef.current);
                                    titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }, 300);
                            }}
                            sx={{ 
                                minWidth: 120,
                                py: 0.5,
                                px: 2,
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                    backgroundColor: 'rgba(156, 39, 176, 0.1)'
                                }
                            }}
                        >
                            {t('quality.challenge.back')}
                        </Button>
                    ) : undefined
                }
            >
                <ChallengeOptions
                    challenge={challenge}
                    bugFound={bugFound}
                    attempts={attempts}
                    wrongOption={wrongOption}
                    onOptionClick={handleOptionClick}
                />
                {/* Dica aparece apenas enquanto não acertou */}
                {!bugFound && (
                    <Box 
                        mt={3} 
                        p={3}
                        sx={{
                            backgroundColor: 'rgba(255, 193, 7, 0.05)',
                            border: '2px solid rgba(255, 193, 7, 0.3)',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(255, 193, 7, 0.1)'
                        }}
                    >
                        <Box display="flex" alignItems="flex-start">
                            <LightbulbIcon sx={{ color: '#FFC107', fontSize: 28, mr: 2, mt: 0.5 }} />
                            <Box>
                                <Typography variant="h6" color="#FFC107" sx={{ fontWeight: 600, mb: 1 }}>
                                    Dica:
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#E0E0E0', fontSize: '1.1rem', lineHeight: 1.6 }}>
                                    {challenge.hint}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
                {error && (
                    <Box mt={2} display="flex" alignItems="center" color="error.main">
                        <ErrorIcon sx={{ mr: 1 }} />
                        <Typography>{error}</Typography>
                    </Box>
                )}
                {bugFound && (
                    <ChallengeSuccess
                        challenge={{
                            title: challenge.title,
                            explanation: challenge.explanation
                        }}
                        attempts={attempts}
                        isLastChallenge={currentChallenge === challenges.length - 1}
                        onNext={resetChallenge}
                        onReset={() => {
                            setBugFound(false);
                            setAttempts(0);
                            setWrongOption(null);
                            setTimeout(() => {
                                titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 300);
                        }}
                    />
                )}
                {/* Alert após 3 tentativas */}
                {attempts >= 3 && !bugFound && (
                    <Box 
                        mt={3} 
                        p={3}
                        sx={{
                            backgroundColor: 'rgba(255, 152, 0, 0.05)',
                            border: '2px solid rgba(255, 152, 0, 0.3)',
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(255, 152, 0, 0.1)'
                        }}
                    >
                        <Typography variant="h6" color="#FF9800" sx={{ fontWeight: 600, mb: 2 }}>
                            Está com dificuldade?
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#E0E0E0', fontSize: '1.1rem', lineHeight: 1.6, mb: 3 }}>
                            Que tal estudar um pouco mais sobre o tema? Fique à vontade para me contatar para discutirmos sobre!
                        </Typography>
                        <Box display="flex" justifyContent="center" gap={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<LinkedInIcon />}
                                href="https://www.linkedin.com/in/lucas-falc%C3%A3o/"
                                target="_blank"
                                sx={{ 
                                    minWidth: '140px',
                                    py: 1
                                }}
                            >
                                LinkedIn
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    setBugFound(false);
                                    setAttempts(0);
                                    setWrongOption(null);
                                    setCurrentChallenge(prev => prev + 1);
                                    setTimeout(() => {
                                        titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }, 300);
                                }}
                                sx={{ 
                                    minWidth: 160,
                                    py: 1,
                                    px: 3,
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    boxShadow: '0 4px 16px rgba(156, 39, 176, 0.3)',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 20px rgba(156, 39, 176, 0.4)'
                                    }
                                }}
                            >
                                {t('quality.try')}
                            </Button>
                        </Box>
                    </Box>
                )}
            </ChallengeCard>
        );
    };

    // Renderização final
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <div ref={titleRef}>
                <Typography variant="h3" color="primary.contrastText" align="center" gutterBottom>
                    {t('quality.title')}
                </Typography>
                <Typography color="text.secondary" align="center" sx={{ mb: 4 }}>
                    {t('quality.description')}
                </Typography>
            </div>
            
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