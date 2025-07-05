// ========================================
// Seção de Qualidade na Home
// Exibe tópicos teóricos de qualidade e um CTA moderno para o FalQAo Lab
// ========================================

// Importações principais do Material-UI e React
import { Box, Container, Grid, Typography, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandMore from '../../../../components/common/ExpandMore';
import { useState } from "react";
import { useTranslation } from '../../../../i18n/useTranslation';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import { useNavigate } from 'react-router-dom';
import qaMembers from '../../../../assets/images/qaMembers.jpg';

// Estilos CSS para animações
const animationStyles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes scaleIn {
        from {
            transform: scale(0.9);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

// ========================================
// Tipagem dos tópicos teóricos
// ========================================
// Define a estrutura de um tópico teórico de qualidade
export interface QualityTopic {
  title: string;
  icon: React.ElementType;
  description: string;
  keyPoints: string[];
}

// Estilização da área de skills (tópicos teóricos)
const StyledSkills = styled("div")(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0, 4, 0),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(3, 0, 2, 0),
    }
}));

// Estilização dos cards dos tópicos teóricos
const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[8],
    },
    '& .sectionIcon': {
        fontSize: '2.5rem',
        color: '#8B5CF6',
        marginRight: theme.spacing(2),
        transition: 'transform 0.3s ease-in-out',
    },
    '& .expandIcon': {
        transition: 'transform 0.3s ease-in-out',
    },
    '& .expandIcon.expanded': {
        transform: 'rotate(180deg)',
    },
    '& .contentExpand': {
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: 0,
        maxHeight: 0,
        transform: 'translateY(-10px)',
    },
    '& .contentExpand.expanded': {
        opacity: 1,
        maxHeight: '500px',
        transform: 'translateY(0)',
    }
}));

// Card de tópico teórico de qualidade
// Exibe título, ícone, descrição e pontos-chave, com opção de expandir/colapsar
const QualityCard = ({ topic, index }: { topic: QualityTopic, index: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <StyledPaper elevation={3}>
            <Box display="flex" alignItems="center" mb={isExpanded ? 2 : 0}>
                {/* Ícone do tópico - agora maior e mais destacado */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        marginRight: 2,
                        flexShrink: 0,
                        transition: 'all 0.3s ease-in-out',
                        transform: isExpanded ? 'scale(1.1)' : 'scale(1)',
                    }}
                >
                    <topic.icon 
                        className="sectionIcon" 
                        style={{ 
                            color: '#8B5CF6',
                            display: 'block',
                            margin: 0,
                            padding: 0,
                            transform: isExpanded ? 'rotate(5deg)' : 'rotate(0deg)',
                        }} 
                    />
                </Box>
                <Box flex={1}>
                    <Typography variant="h6" color="primary.contrastText">
                        {topic.title}
                    </Typography>
                </Box>
                {/* Botão para expandir/colapsar o card */}
                <ExpandMore
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`expandIcon ${isExpanded ? 'expanded' : ''}`}
                    aria-expanded={isExpanded}
                    aria-label="show more"
                    dataTestId={`expand-more-quality-${index}`}
                    sx={{
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            transform: 'scale(1.1)',
                        }
                    }}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </Box>
            {/* Descrição e lista de pontos-chave, exibidos ao expandir */}
            <Box className={`contentExpand ${isExpanded ? 'expanded' : ''}`}>
                <Typography 
                    color="text.secondary" 
                    sx={{ 
                        mb: 2,
                        animation: isExpanded ? 'fadeInUp 0.5s ease-out' : 'none',
                    }}
                >
                    {topic.description}
                </Typography>
                <Box 
                    component="ul" 
                    sx={{ 
                        pl: 2, 
                        mt: 1,
                        animation: isExpanded ? 'fadeInUp 0.5s ease-out 0.1s both' : 'none',
                    }}
                >
                    {topic.keyPoints.map((point, index) => (
                        <Typography 
                            key={index} 
                            component="li" 
                            color="text.secondary"
                            sx={{ 
                                mb: 1,
                                animation: isExpanded ? `fadeInUp 0.5s ease-out ${0.2 + index * 0.1}s both` : 'none',
                            }}
                        >
                            {point}
                        </Typography>
                    ))}
                </Box>
            </Box>
        </StyledPaper>
    );
};

// ========================================
// Componente principal da seção de Qualidade na Home
// ========================================
const Quality = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Monta os tópicos de qualidade dinamicamente para atualizar ao trocar idioma
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

    return (
        <StyledSkills id="quality">
            {/* Injeção dos estilos CSS de animação */}
            <style>{animationStyles}</style>
            
            <Container maxWidth="lg">
                {/* Título e subtítulo da seção, internacionalizados */}
                        <Typography variant="h2" color="primary.contrastText" textAlign="center" gutterBottom>
                    {t('quality.title')}
                        </Typography>
                        <Typography variant="h5" color="text.secondary" textAlign="center" mb={6}>
                    {t('quality.subtitle')}
                        </Typography>
                
                {/* CTA visual para o FalQAo Lab - LARGURA AJUSTADA */}
                <Box sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}>
                    <Paper
                        sx={{
                            p: { xs: 3, md: 6 },
                            position: 'relative',
                            overflow: 'hidden',
                            minHeight: { xs: 280, md: 240 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: theme => theme.palette.background.default
                        }}
                        elevation={3}
                    >
                        {/* Texto e botão à esquerda */}
                        <Box sx={{ zIndex: 2, maxWidth: { xs: '100%', md: '55%' }, textAlign: 'left' }}>
                            <Typography variant="h4" color="primary.contrastText" gutterBottom>
                                {t('quality.ctaTitle')}
                            </Typography>
                            <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1.15rem' }}>
                                {t('quality.ctaDescription')}
                            </Typography>
                            <Button
                                variant="contained"
                                color="success"
                                size="large"
                                sx={{ borderRadius: 3, px: 4, py: 1.5, fontWeight: 700, fontSize: '1.2rem', boxShadow: 3 }}
                                onClick={() => navigate('/qalab#challenges')}
                                data-test-id="quality-cta-button"
                            >
                                {t('quality.ctaButton')}
                            </Button>
                        </Box>
                        {/* Imagem decorativa à direita - ALINHADA MAIS À ESQUERDA */}
                        <Box
                            sx={{ 
                                display: { xs: 'none', md: 'block' },
                                position: 'absolute',
                                right: '-10%', // Movida mais para a esquerda
                                top: 0,
                                bottom: 0,
                                width: '55%', // Largura aumentada
                                height: '100%',
                                zIndex: 1,
                                background: `linear-gradient(90deg, transparent 40%, #232730 100%)`, // Gradiente ajustado
                            }}
                        >
                            <Box
                                component="img"
                                src={qaMembers}
                                alt="QA Members"
                                sx={{ 
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: 0.24, // Menos opaca
                                    borderRadius: 0,
                                    filter: 'grayscale(30%)',
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                }}
                            />
                        </Box>
                    </Paper>
                </Box>

                {/* Cards dos tópicos teóricos - LARGURA AJUSTADA */}
                <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12}>
                            {qualityTopics.map((topic, index) => (
                                <QualityCard key={index} topic={topic} index={index} />
                            ))}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </StyledSkills>
    );
};

export default Quality;