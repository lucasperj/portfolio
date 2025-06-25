// ========================================
// Seção About - Informações sobre mim, skills, métricas e experiências
// ========================================

// Importações do Material-UI para componentes de interface
import { Box, Container, Grid, Typography, Paper } from "@mui/material"
import { styled } from "@mui/material/styles"

// Ícones do Material-UI para as seções
import CodeIcon from '@mui/icons-material/Code';
import TimelineIcon from '@mui/icons-material/Timeline';

// Sistema de tradução para internacionalização
import { useTranslation } from '../../../../i18n/useTranslation';

// Componente de linha do tempo para experiências profissionais
import ExperienceTimeline from '../../../../components/common/ExperienceTimeline';

// ========================================
// Estilizações dos componentes
// ========================================

// Container principal da seção About com padding responsivo
const StyledAbout = styled("div")(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10, 0, 4, 0),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(5, 0, 2, 0),
    }
}));

// Estilização dos cards de Skills e Metrics
const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    '& .sectionIcon': {
        fontSize: '1.5rem',
        color: theme.palette.primary.main,
        marginRight: theme.spacing(1)
    }
}));

// Chips estilizados para exibir as skills/tecnologias
const SkillChip = styled(Box)(({theme}) => ({
    padding: theme.spacing(0.5, 1.5),
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    borderRadius: '16px',
    display: 'inline-block',
    margin: theme.spacing(0.5),
    fontSize: '0.875rem'
}));

// StyledPaper customizado para o card de Metrics com scrollbar opaca
const MetricsPaper = styled(StyledPaper)(({ theme }) => ({
    // Customização da scrollbar para navegadores baseados em Webkit (Chrome, Edge)
    '& ul': {
        scrollbarWidth: 'thin', // Firefox
        scrollbarColor: `${theme.palette.grey[800]} ${theme.palette.background.default}`,
    },
    '& ul::-webkit-scrollbar': {
        width: 8,
        background: theme.palette.background.default,
    },
    '& ul::-webkit-scrollbar-thumb': {
        background: 'rgba(40,40,60,0.85)', // Thumb escuro/opaco
        borderRadius: 8,
        border: '2px solid transparent',
        backgroundClip: 'padding-box',
    },
    '& ul::-webkit-scrollbar-track': {
        background: 'transparent',
    },
}));

// Altura de referência para os cards (pode ajustar conforme necessário)
const CARD_HEIGHT = 300;

// ========================================
// Componente principal da seção About
// ========================================
const About = () => {
    // Hook para acessar as traduções do sistema i18n
    const { t } = useTranslation();

    // Array com todas as skills/tecnologias que domino
    // Cada skill é traduzida dinamicamente baseada no idioma selecionado
    const skills = [
        t('about.skills.selenium'),      // Automação web com Selenium
        t('about.skills.playwright'),    // Automação moderna com Playwright
        t('about.skills.appium'),        // Automação mobile com Appium
        t('about.skills.ant'),           // Build automation com Apache Ant
        t('about.skills.js'),            // JavaScript para automação
        t('about.skills.junit'),         // Framework de testes JUnit
        t('about.skills.testng'),        // Framework de testes TestNG
        t('about.skills.postman'),       // Testes de API com Postman
        t('about.skills.git'),           // Controle de versão com Git
        t('about.skills.jenkins'),       // CI/CD com Jenkins
        t('about.skills.github'),        // Plataforma GitHub
        t('about.skills.docker'),        // Containerização com Docker
        t('about.skills.sql'),           // Banco de dados SQL
        t('about.skills.liferay'),       // Plataforma Liferay
        t('about.skills.accessibility'), // Testes de acessibilidade
        t('about.skills.seo'),           // Testes de SEO
        t('about.skills.manual'),        // Testes manuais
        t('about.skills.testmgmt'),      // Gestão de testes
    ];

    // Array com métricas e conquistas profissionais
    // Cada métrica é traduzida dinamicamente
    const metrics = [
        t('about.metrics.0'), // Primeira métrica (ex: anos de experiência)
        t('about.metrics.1'), // Segunda métrica (ex: projetos entregues)
        t('about.metrics.2'), // Terceira métrica (ex: certificações)
    ];

    return (
        <StyledAbout id="about">
            <Container maxWidth="lg">
                {/* Grid responsivo para organizar o layout */}
                <Grid 
                    container 
                    spacing={{
                        xs: 0,  // Sem espaçamento em telas pequenas
                        md: 6   // Espaçamento de 6 unidades em telas médias e grandes
                    }}
                >
                    {/* Título principal da seção */}
                    <Grid item xs={12} id="about">
                        <Typography 
                            variant="h2" 
                            color="primary.contrastText" 
                            textAlign="center" 
                            gutterBottom 
                            mb={4}
                        >
                            {t('about.title')}
                        </Typography>
                    </Grid>

                    {/* Seção de Skills/Tecnologias */}
                    <Grid item xs={12} md={6}>
                        <StyledPaper elevation={3} sx={{ height: { xs: 'auto', md: CARD_HEIGHT }, minHeight: 240, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            {/* Cabeçalho da seção com ícone */}
                            <Box display="flex" alignItems="center" mb={2}>
                                <CodeIcon className="sectionIcon" />
                                <Typography variant="h5" color="primary.contrastText">
                                    {t('about.skills.title')}
                                </Typography>
                            </Box>
                            {/* Lista de skills exibidas como chips */}
                            <Box sx={{ flex: 1, overflowY: 'auto' }}>
                                {skills.map((skill) => (
                                    <SkillChip key={skill}>{skill}</SkillChip>
                                ))}
                            </Box>
                        </StyledPaper>
                    </Grid>

                    {/* Seção de Métricas/Conquistas */}
                    <Grid item xs={12} md={6}>
                        <MetricsPaper elevation={3} sx={{ height: { xs: 'auto', md: CARD_HEIGHT }, minHeight: 240, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <TimelineIcon className="sectionIcon" />
                                <Typography variant="h5" color="primary.contrastText">
                                    {t('about.metrics.title')}
                                </Typography>
                            </Box>
                            <Box component="ul" sx={{ pl: 2, m: 0, flex: 1, overflowY: 'auto', pr: 1 }}>
                                {metrics.map((metric) => (
                                    <Typography 
                                        key={metric} 
                                        component="li" 
                                        color="text.secondary"
                                        sx={{ mb: 1 }}
                                    >
                                        {metric}
                                    </Typography>
                                ))}
                            </Box>
                        </MetricsPaper>
                    </Grid>
                </Grid>

                {/* Linha do Tempo de Experiências Profissionais */}
                {/* Componente separado que exibe a jornada profissional de forma interativa */}
                <Box sx={{ mt: { xs: 4, md: 6 } }}>
                    <ExperienceTimeline />
                </Box>
            </Container>
        </StyledAbout>
    )
}

export default About 