import { Box, Container, Typography, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import ArticleIcon from '@mui/icons-material/Article';
import BuildIcon from '@mui/icons-material/Build';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const StyledProjects = styled("div")(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'relative'
}));

const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(6),
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden'
}));

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

const SocialButtons = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(4)
}));

const Projects = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <StyledProjects id="projects">
            <Container maxWidth="lg">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <StyledPaper elevation={3}>
                        <motion.div variants={itemVariants}>
                            <Typography variant="h2" color="primary.contrastText" gutterBottom>
                                Projetos
                            </Typography>
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                            <Typography 
                                variant="h5" 
                                color="text.secondary" 
                                paragraph
                                sx={{ mb: 2 }}
                            >
                                Em breve, compartilharei aqui:
                            </Typography>
                        </motion.div>

                        <IconContainer>
                            {[
                                { icon: ArticleIcon, text: "Artigos Técnicos" },
                                { icon: BuildIcon, text: "Frameworks de Automação" },
                                { icon: AutoStoriesIcon, text: "Publicações" }
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
                                        fontStyle: 'italic',
                                        fontWeight: 600,
                                        letterSpacing: '0.5px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 1
                                    }}
                                >
                                    Conteúdo em desenvolvimento
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
                            >
                                LinkedIn
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
                            >
                                GitHub
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<KeyboardArrowUpIcon />}
                                onClick={scrollToTop}
                                sx={{ 
                                    minWidth: '140px',
                                    py: 1,
                                    backgroundColor: theme => theme.palette.primary.dark,
                                    '&:hover': {
                                        backgroundColor: theme => theme.palette.primary.main,
                                    }
                                }}
                            >
                                Início
                            </Button>
                        </SocialButtons>
                    </StyledPaper>
                </motion.div>
            </Container>
        </StyledProjects>
    );
};

export default Projects;
