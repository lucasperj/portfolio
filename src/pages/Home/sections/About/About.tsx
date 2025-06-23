import { Box, Container, Grid, Typography, Paper, Collapse, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import CodeIcon from '@mui/icons-material/Code';
import TimelineIcon from '@mui/icons-material/Timeline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import AmigoTechLogo from "../../../../assets/images/amigotech-logo.jpg"
import TeamSixLogo from "../../../../assets/images/teamsix-logo.jpg"
import LiferayLogo from "../../../../assets/images/liferay-logo.png"
import { useTranslation } from '../../../../i18n/useTranslation';

const StyledAbout = styled("div")(({theme}) => ({
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
    '& .sectionIcon': {
        fontSize: '1.5rem',
        color: theme.palette.primary.main,
        marginRight: theme.spacing(1)
    }
}));

const SkillChip = styled(Box)(({theme}) => ({
    padding: theme.spacing(0.5, 1.5),
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    borderRadius: '16px',
    display: 'inline-block',
    margin: theme.spacing(0.5),
    fontSize: '0.875rem'
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

const CompanyLogo = styled('img')({
    width: '40px',
    height: '40px',
    objectFit: 'contain',
    marginRight: '12px',
    borderRadius: '50%',
    padding: '4px',
    backgroundColor: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.1)'
});

const ExperienceCard = ({ experience }: {
    experience: {
        company: string;
        logo: string;
        period: string;
        role: string;
        description: string;
        highlights?: string[];
    };
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Previne propagação do clique
        setIsExpanded(!isExpanded);
    };

    return (
        <StyledPaper elevation={3}>
            <Box display="flex" alignItems="center" mb={isExpanded ? 2 : 0}>
                <CompanyLogo src={experience.logo} alt={`${experience.company} logo`} />
                <Box flex={1}>
                    <Typography variant="h6" color="primary.contrastText">
                        {experience.company}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {experience.period}
                    </Typography>
                </Box>
                <ExpandMore
                    onClick={handleExpandClick}
                    className={isExpanded ? 'expanded' : ''}
                    aria-expanded={isExpanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </Box>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Box px={1} pb={2}>
                    <Typography variant="subtitle1" color="primary.contrastText" gutterBottom>
                        {experience.role}
                    </Typography>
                    <Typography color="text.secondary" paragraph>
                        {experience.description}
                    </Typography>
                    {experience.highlights && (
                        <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                            {experience.highlights.map((highlight, index) => (
                                <Typography 
                                    key={index} 
                                    component="li" 
                                    color="text.secondary"
                                    sx={{ mb: 1 }}
                                >
                                    {highlight}
                                </Typography>
                            ))}
                        </Box>
                    )}
                </Box>
            </Collapse>
        </StyledPaper>
    );
};

const About = () => {
    const { t } = useTranslation();

    const skills = [
        'Selenium WebDriver',
        'Playwright',
        'Appium',
        'Apache Ant',
        'JavaScript/TypeScript',
        'JUnit',
        'TestNG',
        'Postman',
        'Git',
        'Jenkins',
        'GitHub/Actions',
        'Docker',
        'SQL',
        'Liferay',
        'Acessibilidade',
        'SEO',
        'Testes manuais',
        'Gerenciamento de testes(Testmo, Testrail)',
    ];

    const metrics = [
        'Ao longo de minha carreira, colaborei ativamente com diversas áreas, como desenvolvimento, produto, implantação e negócios, compreendendo as necessidades de cada stakeholder e contribuindo para a entrega de produtos de alta qualidade.',
        'Minhas habilidades abrangem automação de testes, testes de software em diversas modalidades, metodologias ágeis, gerenciamento de testes, integração contínua, versionamento, acessibilidade, SEO, consultoria de qualidade e mentoria.',
        'Busco constantemente aprimorar meus conhecimentos e habilidades para oferecer soluções inovadoras e eficientes para os desafios de cada projeto.'
    ];

    const experiences = [
        {
            company: 'Amigo Tech',
            logo: AmigoTechLogo,
            period: '2024 - Hoje',
            role: 'Consultor de qualidade',
            description: 'Definindo estratégias de qualidade em um ecossistema fintech médico integrado, atuando por três produtos principais:',
            highlights: [
                "Aplicação web para Contabilidade Médica: Portal do contábil de clientes e quadro de informações PJ, com automação E2E usando Playwright",
                "Aplicativo Mobile 'Amigo One': Prontuários inteligentes e gestão contábil, implementando testes mobile com Appium",
                "ABU 'Amigo Pay': Sistema de pagamentos integrado com BaaS (Dock), garantindo qualidade em integrações críticas",
                "Consultoria estratégica em qualidade para todo o ecossistema, estruturando casos de teste, processos e métricas"
            ]
        },
        {
            company: 'Team Six Tech',
            logo: TeamSixLogo,
            period: '2024',
            role: 'Especialista em qualidade e acessibilidade',
            description: 'Atuação no projeto de migração do portal NotreDame Intermédica/Hapvida para Liferay, com foco em acessibilidade:',
            highlights: [
                "Implementação de padrões WCAG para acessibilidade digital",
                "Otimização de contraste, hierarquia e navegação para leitores de tela",
                "Consultoria em SEO e performance web (LCP, CLS)",
                "Aplicação da heurística CROP para melhor experiência do usuário"
            ]
        },
        {
            company: 'Liferay',
            logo: LiferayLogo,
            period: '2022 - 2023',
            role: 'Analista de qualidade',
            description: 'Desenvolvimento e manutenção de frameworks de automação para o Liferay DXP, focando em qualidade e eficiência:',
            highlights: [
                "Liderança em iniciativas de automação com Poshi(Selenium)",
                "Gerenciamento e configuração de ambientes com Apache Ant e Docker",
                "Monitoramento de CI/CD com Jenkins e TestRail",
                "Mentoria técnica e documentação de processos de QA"
            ]
        }
    ];

    return (
        <StyledAbout id="about">
            <Container maxWidth="lg">
                <Grid 
                    container 
                    spacing={{
                        xs: 0,
                        md: 6
                    }}
                >
                    <Grid item xs={12} id="about">
                        <Typography variant="h2" color="primary.contrastText" textAlign="center" gutterBottom mb={4}>
                            {t('about.title')}
                        </Typography>
                    </Grid>

                    {/* Skills Section */}
                    <Grid item xs={12} md={6}>
                        <StyledPaper elevation={3}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <CodeIcon className="sectionIcon" />
                                <Typography variant="h5" color="primary.contrastText">
                                    {t('about.skills.title')}
                                </Typography>
                            </Box>
                            <Box>
                                {skills.map((skill) => (
                                    <SkillChip key={skill}>{skill}</SkillChip>
                                ))}
                            </Box>
                        </StyledPaper>
                    </Grid>

                    {/* Metrics Section */}
                    <Grid item xs={12} md={6}>
                        <StyledPaper elevation={3}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <TimelineIcon className="sectionIcon" />
                                <Typography variant="h5" color="primary.contrastText">
                                    {t('about.metrics.title')}
                                </Typography>
                            </Box>
                            <Box component="ul" sx={{ pl: 2, m: 0 }}>
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
                        </StyledPaper>
                    </Grid>

                    {/* Experience Section */}
                    <Grid item xs={12}>
                        <Typography 
                            variant="h4" 
                            color="primary.contrastText" 
                            sx={{
                                mb: 2,
                                mt: {
                                    xs: 6,
                                    md: 0
                                },
                                textAlign: 'center'
                            }}
                        >
                            {t('about.experience.title')}
                        </Typography>
                    </Grid>

                    {experiences.map((exp) => (
                        <Grid 
                            item 
                            xs={12} 
                            md={4} 
                            key={exp.company}
                            sx={{
                                mb: {
                                    xs: 2, // 16px de margem bottom em telas pequenas
                                    md: -7  // sem margem em telas médias e maiores
                                }
                            }}
                        >
                            <ExperienceCard experience={exp} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </StyledAbout>
    )
}

export default About 