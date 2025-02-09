import { Box, Container, Grid, Typography, Paper, Collapse, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import CodeIcon from '@mui/icons-material/Code';
import TimelineIcon from '@mui/icons-material/Timeline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import AmigoTechLogo from "../../../../assets/images/amigotech-logo.jpg"
import TeamSixLogo from "../../../../assets/images/teamsix-logo.jpg"
import LiferayLogo from "../../../../assets/images/liferay-logo.png"

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
                    <Typography color="text.secondary">
                        {experience.description}
                    </Typography>
                </Box>
            </Collapse>
        </StyledPaper>
    );
};

const About = () => {
    const skills = [
        'Selenium WebDriver',
        'Cypress',
        'JavaScript/TypeScript',
        'Java',
        'Python',
        'React Testing Library',
        'Jest',
        'JUnit',
        'TestNG',
        'REST Assured',
        'Postman',
        'Git',
        'Jenkins',
        'GitHub Actions',
        'Docker',
        'SQL'
    ];

    const metrics = [
        'Redução de 40% no tempo de execução dos testes através de otimização e paralelização',
        'Implementação de pipeline de CI/CD reduzindo o tempo de deploy em 60%',
        'Cobertura de 90% dos casos de teste críticos com automação',
        'Identificação proativa de mais de 200 bugs antes do deploy em produção'
    ];

    const experiences = [
        {
            company: 'Amigo Tech',
            logo: AmigoTechLogo,
            period: '2020 - 2021',
            role: 'QA Analyst',
            description: `Iniciei minha jornada na área de QA na Amigo Tech, onde desenvolvi habilidades 
            em testes manuais e automatizados. Participei da implementação de processos de qualidade e 
            contribuí para a redução significativa de bugs em produção.`
        },
        {
            company: 'TeamSix',
            logo: TeamSixLogo,
            period: '2021 - 2022',
            role: 'QA Analyst',
            description: `Na TeamSix, fui responsável pela criação e execução de testes automatizados, 
            contribuindo para a melhoria da qualidade do produto. Implementei frameworks de teste e 
            trabalhei em estreita colaboração com desenvolvedores para garantir a qualidade das entregas.`
        },
        {
            company: 'Liferay',
            logo: LiferayLogo,
            period: '2022 - Atual',
            role: 'QA Engineer',
            description: `Como QA Engineer na Liferay, atuo no desenvolvimento e manutenção de frameworks de automação, 
            implementando testes end-to-end e de API. Trabalho com tecnologias como Selenium, Cypress e REST Assured, 
            além de participar ativamente na implementação de práticas de CI/CD e na melhoria contínua dos processos de qualidade.`
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
                            Sobre mim
                        </Typography>
                    </Grid>

                    {/* Skills Section */}
                    <Grid item xs={12} md={6}>
                        <StyledPaper elevation={3}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <CodeIcon className="sectionIcon" />
                                <Typography variant="h5" color="primary.contrastText">
                                    Habilidades técnicas
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
                                    O que me trouxe até aqui
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
                                mb: 6,
                                mt: {
                                    xs: 6,  // 48px em telas pequenas
                                    md: 0   // 0px em telas médias e maiores
                                }
                            }}
                        >
                            Experiência profissional
                        </Typography>
                    </Grid>

                    {experiences.map((exp) => (
                        <Grid item xs={12} md={4} key={exp.company}>
                            <ExperienceCard experience={exp} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </StyledAbout>
    )
}

export default About 