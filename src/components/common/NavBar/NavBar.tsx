import { AppBar, Toolbar, styled, Box, Button } from "@mui/material"
import { scrollToSection } from '../../../utils/scrollHandlers';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../../i18n/useTranslation';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Componente de Navbar global, usado tanto na HomePage quanto no QA Lab
const NavBar = () => {
    console.log('NavBar renderizou!');
    // Estado para controlar qual seção está ativa na Home
    const [activeSection, setActiveSection] = useState('');
    // Hook de tradução
    const { t } = useTranslation();
    // Hook do React Router para saber a rota atual
    const location = useLocation();
    // Flag para saber se está no QA Lab (rota começa com /qalab)
    const isQALab = location.pathname.startsWith('/qalab');

    // Função para scroll suave para seções na Home (exclusivo da Home)
    const handleNavClick = (sectionId: string) => {
        setActiveSection(sectionId);
        scrollToSection(sectionId);
    };

    // Efeito para atualizar a seção ativa conforme o scroll na Home
    useEffect(() => {
        if (isQALab) return; // Só roda na Home
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

    // Padronizar o AppBar para ambas as páginas
    const StyledAppBar = styled(AppBar)(({ theme }) => ({
      backgroundColor: theme.palette.primary.main, // Fundo roxo padrão
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      zIndex: 1201,
      height: 64,
      display: 'flex',
      justifyContent: 'center',
    }));

    // Estilização do Toolbar para layout flexível
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

    // Estilo dos botões centrais (navegação principal)
    // Usado tanto na Home quanto no QA Lab, mas muda o texto e ação dinamicamente
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

    // Botão lateral: verde para QALab, roxo para Portfolio
    const sideButtonSx = (color: 'success' | 'secondary', theme: any) => ({
      color: theme.palette.getContrastText(theme.palette[color].main),
      background: theme.palette[color].main,
      fontWeight: 700,
      borderRadius: '16px',
      px: 2.5,
      py: 1,
      minWidth: 90,
      height: 40,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      transition: 'all 0.2s',
      fontSize: '0.92rem',
      textTransform: 'none',
      '&:hover': {
        background: theme.palette[color].dark,
      },
    });

    return (
        <StyledAppBar
            position="fixed"
            data-test-id="navbar"
        >
            <StyledToolbar>
                {/*
                  =====================
                  CANTO ESQUERDO
                  =====================
                  - Home: botão verde "FalQAo Lab" (leva para o QA Lab)
                  - QA Lab: botão roxo "Descubra mais sobre mim" (leva para a Home)
                  - O estilo é dinâmico via sideButtonSx
                */}
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {!isQALab ? (
                        // Exclusivo da HomePage
                        <Button
                            component={RouterLink}
                            to="/qalab"
                            sx={theme => sideButtonSx('success', theme)}
                            data-test-id="navbar-qalab-button"
                        >
                            FalQAo Lab
                        </Button>
                    ) : (
                        // Exclusivo do QA Lab
                        <Button
                            component={RouterLink}
                            to="/"
                            sx={theme => sideButtonSx('secondary', theme)}
                            data-test-id="navbar-aboutme-button"
                        >
                            Conheça o Falcão
                        </Button>
                    )}
                </Box>

                {/*
                  =====================
                  CENTRO (sempre 3 botões)
                  =====================
                  - Home: Sobre / Qualidade / Projetos (scroll para seções)
                  - QA Lab: Artigos / Desafios / Projetos (anchors na página do QA Lab)
                  - O conteúdo é dinâmico conforme a página
                */}
                <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    {!isQALab ? (
                        // Exclusivo da HomePage
                        <>
                            <Button onClick={() => handleNavClick('about')} sx={theme => navButtonSx(activeSection === 'about', theme)} data-test-id="navbar-about-button">
                                {t('navbar.about')}
                            </Button>
                            <Button onClick={() => handleNavClick('quality')} sx={theme => navButtonSx(activeSection === 'quality', theme)} data-test-id="navbar-quality-button">
                                {t('navbar.quality')}
                            </Button>
                            <Button onClick={() => handleNavClick('projects')} sx={theme => navButtonSx(activeSection === 'projects', theme)} data-test-id="navbar-projects-button">
                                {t('navbar.projects')}
                            </Button>
                        </>
                    ) : (
                        // Exclusivo do QA Lab
                        <>
                            <Button
                                component={RouterLink}
                                to="/qalab#articles-carousel"
                                sx={theme => navButtonSx(location.hash === '#articles-carousel', theme)}
                                data-test-id="navbar-articles-button"
                            >
                                Artigos
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/qalab#challenges"
                                sx={theme => navButtonSx(location.hash === '#challenges', theme)}
                                data-test-id="navbar-challenges-button"
                            >
                                Desafios
                            </Button>
                            <Button
                                component={RouterLink}
                                to="/qalab#qalab-projects"
                                sx={theme => navButtonSx(location.hash === '#qalab-projects', theme)}
                                data-test-id="navbar-qalab-projects-button"
                            >
                                Projetos
                            </Button>
                        </>
                    )}
                </Box>

                {/*
                  =====================
                  CANTO DIREITO
                  =====================
                  - Sempre exibe o botão de tradução (LanguageSelector)
                  - Visual fixo, alinhado à direita
                */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <LanguageSelector />
                </Box>
            </StyledToolbar>
        </StyledAppBar>
    )
}

export default NavBar;