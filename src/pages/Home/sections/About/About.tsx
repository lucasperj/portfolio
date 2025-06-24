import { Box, Container, Grid, Typography, Paper, Collapse, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import CodeIcon from '@mui/icons-material/Code';
import TimelineIcon from '@mui/icons-material/Timeline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandMore from '../../../../components/common/ExpandMore';
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
        t('about.skills.selenium'),
        t('about.skills.playwright'),
        t('about.skills.appium'),
        t('about.skills.ant'),
        t('about.skills.js'),
        t('about.skills.junit'),
        t('about.skills.testng'),
        t('about.skills.postman'),
        t('about.skills.git'),
        t('about.skills.jenkins'),
        t('about.skills.github'),
        t('about.skills.docker'),
        t('about.skills.sql'),
        t('about.skills.liferay'),
        t('about.skills.accessibility'),
        t('about.skills.seo'),
        t('about.skills.manual'),
        t('about.skills.testmgmt'),
    ];

    const metrics = [
        t('about.metrics.0'),
        t('about.metrics.1'),
        t('about.metrics.2'),
    ];

    const experiences = [
        {
            company: t('about.experiences.amigotech.company'),
            logo: AmigoTechLogo,
            period: t('about.experiences.amigotech.period'),
            role: t('about.experiences.amigotech.role'),
            description: t('about.experiences.amigotech.description'),
            highlights: [
                t('about.experiences.amigotech.highlights.0'),
                t('about.experiences.amigotech.highlights.1'),
                t('about.experiences.amigotech.highlights.2'),
                t('about.experiences.amigotech.highlights.3'),
            ]
        },
        {
            company: t('about.experiences.teamsix.company'),
            logo: TeamSixLogo,
            period: t('about.experiences.teamsix.period'),
            role: t('about.experiences.teamsix.role'),
            description: t('about.experiences.teamsix.description'),
            highlights: [
                t('about.experiences.teamsix.highlights.0'),
                t('about.experiences.teamsix.highlights.1'),
                t('about.experiences.teamsix.highlights.2'),
                t('about.experiences.teamsix.highlights.3'),
            ]
        },
        {
            company: t('about.experiences.liferay.company'),
            logo: LiferayLogo,
            period: t('about.experiences.liferay.period'),
            role: t('about.experiences.liferay.role'),
            description: t('about.experiences.liferay.description'),
            highlights: [
                t('about.experiences.liferay.highlights.0'),
                t('about.experiences.liferay.highlights.1'),
                t('about.experiences.liferay.highlights.2'),
                t('about.experiences.liferay.highlights.3'),
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