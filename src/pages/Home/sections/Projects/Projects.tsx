// Importações de componentes do Material-UI, ícones, animações e utilitários
import { Box, Container, Typography, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion"; // Biblioteca para animações declarativas
import ArticleIcon from '@mui/icons-material/Article';
import BuildIcon from '@mui/icons-material/Build';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTranslation } from '../../../../i18n/useTranslation';

// Estilização do container principal da seção de projetos
const StyledProjects = styled("div")(({theme}) => ({
    backgroundColor: theme.palette.background.paper, // Cor de fundo
    minHeight: '100vh', // Altura mínima para ocupar a tela toda
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'relative'
}));

// Estilização do card central que envolve o conteúdo
const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(6),
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden'
}));

// Container para os ícones de categorias de projetos
const IconContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(6),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing(4),
    },
    '& .MuiSvgIcon-root': {
        fontSize: '3rem',
        color: theme.palette.primary.main
    }
}));

// Container para os botões sociais (LinkedIn, GitHub, Início)
const SocialButtons = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(4)
}));

// Componente principal da seção de Projetos
const Projects = () => {
    const { t } = useTranslation();

    // Variantes de animação para o container principal (usado pelo Framer Motion)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3 // Animação em cascata dos filhos
            }
        }
    };

    // Variantes de animação para cada item (entrada com leve movimento e fade)
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const, // Animação tipo spring (mola)
                stiffness: 100
            }
        }
    };

    // Função para rolar suavemente para o topo da página
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Renderização do componente
    return (
        <StyledProjects id="projects">
            <Container maxWidth="lg">
                {/* Container animado para entrada dos elementos */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <StyledPaper elevation={3}>
                        {/* Título animado */}
                        <motion.div variants={itemVariants}>
                            <Typography variant="h2" color="primary.contrastText" gutterBottom>
                                {t('projects.title')}
                            </Typography>
                        </motion.div>
                        {/* Subtítulo animado */}
                        <motion.div variants={itemVariants}>
                            <Typography 
                                variant="h5" 
                                color="text.secondary" 
                                paragraph
                                sx={{ mb: 2 }}
                            >
                                {t('projects.soon')}
                            </Typography>
                        </motion.div>
                        {/* Ícones de categorias de projetos, cada um com animação ao passar o mouse */}
                        <IconContainer>
                            {[
                                { icon: ArticleIcon, text: t('projects.articles') },
                                { icon: BuildIcon, text: t('projects.frameworks') },
                                { icon: AutoStoriesIcon, text: t('projects.publications') }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ 
                                        scale: 1.1,
                                        rotate: [0, -5, 5, 0],
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                                        <item.icon />
                                        <Typography 
                                            color="text.secondary"
                                            variant="h6"
                                            sx={{ fontWeight: 500 }}
                                        >
                                            {item.text}
                                        </Typography>
                                    </Box>
                                </motion.div>
                            ))}
                        </IconContainer>
                        {/* Mensagem de conteúdo em desenvolvimento, com animação de foguete */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ 
                                opacity: 1,
                                scale: [1, 1.02, 1],
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Box
                                sx={{
                                    background: theme => `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
                                    p: 4,
                                    borderRadius: 2,
                                    mt: 6,
                                    mb: 4,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                }}
                            >
                                <Typography 
                                    variant="h5" 
                                    color="white"
                                    sx={{ 
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        letterSpacing: '0.5px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1
                                    }}
                                >
                                    {t('projects.development')}
                                    {/* Foguete animado */}
                                    <motion.span
                                        animate={{ 
                                            y: [-3, 3, -3],
                                            rotate: [-10, 10, -10]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        🚀
                                    </motion.span>
                                </Typography>
                            </Box>
                        </motion.div>
                        {/* Botões sociais: LinkedIn, GitHub e botão para voltar ao início */}
                        <SocialButtons>
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
                                data-test-id="project-linkedin-button"
                            >
                                {t('projects.linkedin')}
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<GitHubIcon />}
                                href="https://github.com/lucasperj"
                                target="_blank"
                                sx={{ 
                                    minWidth: '140px',
                                    py: 1
                                }}
                                data-test-id="project-github-button"
                            >
                                {t('projects.github')}
                            </Button>
                           
                        </SocialButtons>
                    </StyledPaper>
                </motion.div>
            </Container>
        </StyledProjects>
    );
};

export default Projects;
