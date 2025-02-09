import { Box, Container, Grid, Typography, Paper, Collapse, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import BugReportIcon from '@mui/icons-material/BugReport';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

const StyledSkills = styled("div")(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10, 0),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(5, 0),
    }
}));

const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    '& .sectionIcon': {
        fontSize: '2rem',
        color: theme.palette.primary.main,
        marginRight: theme.spacing(2)
    }
}));

const ExpandMore = styled(IconButton)(({ theme }) => ({
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    '&.expanded': {
        transform: 'rotate(180deg)',
    }
}));

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
                <Box px={1}>
                    <Typography color="text.secondary" paragraph>
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

interface QualityTopic {
    title: string;
    icon: any;
    description: string;
    keyPoints: string[];
}

const Skills = () => {
    const qualityTopics: QualityTopic[] = [
        {
            title: "Testes Funcionais e Automação",
            icon: IntegrationInstructionsIcon,
            description: "A automação de testes é fundamental para garantir a qualidade contínua do software, permitindo testes rápidos e consistentes.",
            keyPoints: [
                "Desenvolvimento de frameworks robustos de automação",
                "Integração com CI/CD para feedback rápido",
                "Cobertura estratégica de testes",
                "Manutenibilidade e reusabilidade de código"
            ]
        },
        {
            title: "Performance e Escalabilidade",
            icon: SpeedIcon,
            description: "Garantir que o software não apenas funcione, mas funcione bem sob diferentes condições de carga e uso.",
            keyPoints: [
                "Testes de carga e stress",
                "Monitoramento de métricas-chave",
                "Otimização de recursos",
                "Análise de gargalos"
            ]
        },
        {
            title: "Segurança e Conformidade",
            icon: SecurityIcon,
            description: "A segurança é um aspecto crítico da qualidade, protegendo dados e garantindo conformidade com regulamentações.",
            keyPoints: [
                "Testes de penetração",
                "Análise de vulnerabilidades",
                "Proteção de dados sensíveis",
                "Conformidade com LGPD/GDPR"
            ]
        }
    ];

    const challenge = {
        title: "Encontre o Bug!",
        description: "Um e-commerce apresenta inconsistências no carrinho de compras. Como você abordaria esse problema?",
        tip: "Dica: Pense em casos de borda e concorrência"
    };

    return (
        <StyledSkills id="skills">
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h2" color="primary.contrastText" textAlign="center" gutterBottom>
                            Qualidade de Software
                        </Typography>
                        <Typography variant="h5" color="text.secondary" textAlign="center" mb={6}>
                            Explorando os pilares fundamentais para garantir excelência em software
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        {qualityTopics.map((topic, index) => (
                            <QualityCard key={index} topic={topic} />
                        ))}
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <StyledPaper elevation={3}>
                            <Box display="flex" alignItems="center" mb={3}>
                                <BugReportIcon className="sectionIcon" />
                                <Typography variant="h6" color="primary.contrastText">
                                    Desafio QA
                                </Typography>
                            </Box>
                            <Typography variant="h6" color="primary.contrastText" gutterBottom>
                                {challenge.title}
                            </Typography>
                            <Typography color="text.secondary" paragraph>
                                {challenge.description}
                            </Typography>
                            <Typography 
                                color="primary.main" 
                                sx={{ 
                                    fontStyle: 'italic',
                                    mt: 2
                                }}
                            >
                                {challenge.tip}
                            </Typography>
                        </StyledPaper>
                    </Grid>
                </Grid>
            </Container>
        </StyledSkills>
    );
};

export default Skills;
