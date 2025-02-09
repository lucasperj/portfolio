import { AppBar, Toolbar, styled, Button } from "@mui/material"
import { scrollToSection } from '../../utils/scrollHandlers';
import { useState, useEffect } from 'react';

const NavBar = () => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['about', 'skills', 'projects'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const StyledAppBar = styled(AppBar)(({theme}) => ({
        transition: 'all 0.3s ease-in-out',
        backgroundColor: activeSection ? theme.palette.primary.main : 'transparent',
        boxShadow: activeSection ? theme.shadows[4] : 'none',
    }));

    const StyledToobar = styled(Toolbar)(({theme}) => ({
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
            <StyledToobar>
                <StyledButton 
                    onClick={() => scrollToSection('about')}
                    className={activeSection === 'about' ? 'active' : ''}
                >
                    About
                </StyledButton>
                <StyledButton 
                    onClick={() => scrollToSection('skills')}
                    className={activeSection === 'skills' ? 'active' : ''}
                >
                    Skills
                </StyledButton>
                <StyledButton 
                    onClick={() => scrollToSection('projects')}
                    className={activeSection === 'projects' ? 'active' : ''}
                >
                    Projects
                </StyledButton>
            </StyledToobar>
        </StyledAppBar>
    )
}

export default NavBar