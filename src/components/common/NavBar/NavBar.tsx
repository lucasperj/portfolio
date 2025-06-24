import { AppBar, Toolbar, styled, Box, Button } from "@mui/material"
import { scrollToSection } from '../../../utils/scrollHandlers';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../../i18n/useTranslation';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const NavBar = () => {
    console.log('NavBar renderizou!');
    const [activeSection, setActiveSection] = useState('');
    const { t } = useTranslation();
    const location = useLocation();
    const isQALab = location.pathname.startsWith('/qalab');

    // Scroll para seções na Home
    const handleNavClick = (sectionId: string) => {
        setActiveSection(sectionId);
        scrollToSection(sectionId);
    };

    useEffect(() => {
        if (isQALab) return;
        const handleScroll = () => {
            const sections = ['about', 'quality', 'projects'];
            const scrollPosition = window.scrollY;
            const navbarHeight = 64;
            const aboutElement = document.getElementById('about');
            if (aboutElement) {
                const { offsetTop } = aboutElement;
                if (scrollPosition + navbarHeight < offsetTop) {
                    setActiveSection('');
                    return;
                }
            }
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition + navbarHeight >= offsetTop && 
                        scrollPosition + navbarHeight < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isQALab]);

    const StyledAppBar = styled(AppBar)(({theme}) => ({
        transition: 'all 0.3s ease-in-out',
        backgroundColor: theme.palette.primary.main,
        boxShadow: theme.shadows[4],
    }));

    const StyledToolbar = styled(Toolbar)(({theme}) => ({
        display: "flex",
        alignItems: "center",
        minHeight: 64,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        }
    }));

    // Estilo dos botões centrais
    const navButtonSx = (active: boolean, theme: any) => ({
        color: theme.palette.primary.contrastText,
        fontSize: '1rem',
        textTransform: 'none',
        fontWeight: active ? 'bold' : 'normal',
        position: 'relative',
        background: 'none',
        boxShadow: 'none',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            width: active ? '80%' : '0%',
            height: '2px',
            backgroundColor: theme.palette.primary.contrastText,
            transition: 'all 0.3s ease',
            left: active ? '10%' : '50%'
        },
        '&:hover::after': {
            width: '80%',
            left: '10%'
        }
    });

    // Estilo do botão lateral (verde ou roxo)
    const sideButtonSx = (color: 'success' | 'secondary', theme: any) => ({
        color: theme.palette.getContrastText(theme.palette[color].main),
        background: theme.palette[color].main,
        fontWeight: 700,
        borderRadius: 8,
        px: 2.5,
        py: 1,
        boxShadow: theme.shadows[2],
        '&:hover': {
            background: theme.palette[color].dark,
        },
        fontSize: '1rem',
        textTransform: 'none',
    });

    return (
        <StyledAppBar position="fixed">
            <StyledToolbar>
                {/* Esquerda: botão dinâmico */}
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {!isQALab ? (
                        <Button
                            component={RouterLink}
                            to="/qalab"
                            sx={theme => sideButtonSx('success', theme)}
                        >
                            FalQAo Lab
                        </Button>
                    ) : (
                        <Button
                            component={RouterLink}
                            to="/"
                            sx={theme => sideButtonSx('secondary', theme)}
                        >
                            {t('navbar.aboutMe') || 'Descubra mais sobre mim'}
                        </Button>
                    )}
                </Box>

                {/* Centro: 3 botões principais, sempre centralizados */}
                <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    {!isQALab ? (
                        <>
                            <Button onClick={() => handleNavClick('about')} sx={theme => navButtonSx(activeSection === 'about', theme)}>
                                {t('navbar.about')}
                            </Button>
                            <Button onClick={() => handleNavClick('quality')} sx={theme => navButtonSx(activeSection === 'quality', theme)}>
                                {t('navbar.quality')}
                            </Button>
                            <Button onClick={() => handleNavClick('projects')} sx={theme => navButtonSx(activeSection === 'projects', theme)}>
                                {t('navbar.projects')}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                component={RouterLink}
                                to="/qalab#articles-carousel"
                                sx={theme => navButtonSx(location.hash === '#articles-carousel', theme)}
                            >
                                {t('navbar.articles') || 'Artigos'}
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/qalab#challenges"
                                sx={theme => navButtonSx(location.hash === '#challenges', theme)}
                            >
                                {t('navbar.challenges') || 'Desafios'}
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/qalab#qalab-projects"
                                sx={theme => navButtonSx(location.hash === '#qalab-projects', theme)}
                            >
                                {t('navbar.projects') || 'Projetos'}
                            </Button>
                        </>
                    )}
                </Box>

                {/* Direita: botão de idioma */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <LanguageSelector />
                </Box>
            </StyledToolbar>
        </StyledAppBar>
    )
}

export default NavBar;