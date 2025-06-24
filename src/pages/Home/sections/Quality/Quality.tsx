// Importações de componentes do Material-UI, ícones, hooks e animações
import { Box, Container, Grid, Typography, Paper, Collapse, IconButton, Button, Tooltip } from "@mui/material"
import { styled } from "@mui/material/styles"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandMore from '../../../../components/common/ExpandMore';
import { useState, useRef } from "react";
import { useTranslation } from '../../../../i18n/useTranslation';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import { useNavigate } from 'react-router-dom';

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
            <Container maxWidth="lg">
                <Typography variant="h2" color="primary.contrastText" textAlign="center" gutterBottom>
                    {t('quality.title')}
                </Typography>
                <Typography variant="h5" color="text.secondary" textAlign="center" mb={6}>
                    {t('quality.subtitle')}
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={8}>
                        {qualityTopics.map((topic, index) => (
                            <QualityCard key={index} topic={topic} />
                        ))}
                    </Grid>
                </Grid>
                {/* CTA para o FalQAo Lab */}
                <Paper sx={{ p: 6, mt: 6, mb: 6, textAlign: 'center', background: theme => theme.palette.background.default }} elevation={3}>
                    <Typography variant="h4" color="primary.contrastText" gutterBottom>
                        {t('quality.ctaTitle') || 'Desafios Interativos de Qualidade'}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 4 }}>
                        {t('quality.ctaDescription') || 'Quer exercitar seus conhecimentos em qualidade, acessibilidade, automação e boas práticas?'}
                    </Typography>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        sx={{ borderRadius: 3, px: 4, py: 1.5, fontWeight: 700, fontSize: '1.2rem', boxShadow: 3 }}
                        onClick={() => navigate('/qalab#challenges')}
                    >
                        {t('quality.ctaButton') || 'Ir para o FalQAo Lab'}
                    </Button>
                </Paper>
            </Container>
        </StyledSkills>
    );
};

export default Quality;