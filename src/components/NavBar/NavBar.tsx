import { AppBar, Toolbar, styled, Button } from "@mui/material"
import { scrollToSection } from '../../utils/scrollHandlers';
import { useState, useEffect } from 'react';

const NavBar = () => {
    const [activeSection, setActiveSection] = useState('');

    const handleNavClick = (sectionId: string) => {
        setActiveSection(sectionId); // Atualiza imediatamente ao clicar
        scrollToSection(sectionId);
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['about', 'quality', 'projects'];
            const scrollPosition = window.scrollY;
            const navbarHeight = 64; // altura padrão da navbar do Material-UI

            // Lógica: se estiver acima da seção 'about', desativa todos os botões (usuário está na Hero)
            const aboutElement = document.getElementById('about');
            if (aboutElement) {
                const { offsetTop } = aboutElement;
                if (scrollPosition + navbarHeight < offsetTop) {
                    setActiveSection(''); // Nenhuma seção ativa
                    return;
                }
            }

            // Percorre as seções para verificar qual está visível na tela
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    // Se o scroll está dentro dos limites da seção, ativa ela
                    if (scrollPosition + navbarHeight >= offsetTop && 
                        scrollPosition + navbarHeight < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        // Executa handleScroll ao montar o componente para já marcar a seção correta
        handleScroll();

        // Adiciona o listener de scroll
        window.addEventListener('scroll', handleScroll);
        // Remove o listener ao desmontar
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const StyledAppBar = styled(AppBar)(({theme}) => ({
        transition: 'all 0.3s ease-in-out',
        backgroundColor: activeSection ? theme.palette.primary.main : 'transparent',
        boxShadow: activeSection ? theme.shadows[4] : 'none',
    }));

    const StyledToolbar = styled(Toolbar)(({theme}) => ({
        display: "flex",
        justifyContent: "center",
        gap: theme.spacing(8),
        [theme.breakpoints.down('md')]: {
            justifyContent: "space-evenly",
            gap: 0
        }
    }));

    const StyledButton = styled(Button)(({theme}) => ({
        color: theme.palette.primary.contrastText,
        fontSize: '1rem',
        textTransform: 'none',
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: '0%',
            height: '2px',
            backgroundColor: theme.palette.primary.contrastText,
            transition: 'all 0.3s ease',
        },
        '&.active': {
            fontWeight: 'bold',
        },
        '&.active::after': {
            width: '80%',
            left: '10%'
        },
        '&:hover::after': {
            width: '80%',
            left: '10%'
        }
    }));

    return (
        <StyledAppBar position="fixed">
            <StyledToolbar>
                <StyledButton 
                    onClick={() => handleNavClick('about')}
                    className={activeSection === 'about' ? 'active' : ''}
                >
                    Sobre
                </StyledButton>
                <StyledButton 
                    onClick={() => handleNavClick('quality')}
                    className={activeSection === 'quality' ? 'active' : ''}
                >
                    Qualidade
                </StyledButton>
                <StyledButton 
                    onClick={() => handleNavClick('projects')}
                    className={activeSection === 'projects' ? 'active' : ''}
                >
                    Projetos
                </StyledButton>
            </StyledToolbar>
        </StyledAppBar>
    )
}

export default NavBar