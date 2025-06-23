import { Box, Container, Grid2, Typography, useTheme, useMediaQuery, Collapse } from "@mui/material"
import Grid from '@mui/material/Grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useState, useRef } from "react";
import { useTranslation } from '../../../../i18n/useTranslation';

import Avatar from "../../../../assets/images/avatar.jpg"
import StyledButton from "../../../../components/StyledButton/StyledButton";
import { AnimatedBackground } from "../../../../components/AnimatedBackground/AnimatedBackground";
import { handleDownloadCV } from "../../../../utils/downloadHandlers";
import { handleLinkedInClick, handleEmailClick, handleWhatsAppClick } from "../../../../utils/contactHandlers";
import { StyledHero, StyledImg, ContactMenu, ContactOption } from "../../../../styles/heroStyles";
import CV from "../../../../assets/files/cv_en.pdf"

const Hero = () => {
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation();

    const handleContactClick = () => {
        if (isMobile) {
            handleWhatsAppClick();
        } else {
            setOpen(!open);
        }
    };

    // Funções para hover e abertura
    const handleMouseEnter = () => {
        setHover(true);
        setOpen(true);
    };
    const handleMouseLeave = (e: React.MouseEvent) => {
        // Fecha apenas se mouse sair do botão e do menu
        if (!buttonRef.current || !menuRef.current) {
            setHover(false);
            setOpen(false);
            return;
        }
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();
        if (
            e.clientX < buttonRect.left || e.clientX > buttonRect.right ||
            (e.clientY < buttonRect.top && e.clientY < menuRect.top) ||
            (e.clientY > buttonRect.bottom && e.clientY > menuRect.bottom)
        ) {
            setHover(false);
            setOpen(false);
        }
    };

    return (
        <StyledHero> 
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <Box position="relative"> 
                            <Box position="absolute" width={"150%"} top={-100} right={0}> 
                                <AnimatedBackground />
                            </Box>
                            <Box 
                                position="relative" 
                                sx={{ 
                                    textAlign: {
                                        xs: "center",
                                        md: "left"
                                    }
                                }}
                            > 
                                <StyledImg src={Avatar} alt="Foto do Lucas"/> 
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h1" color="primary.contrastText" textAlign="center" pb={2}>{t('hero.name')}</Typography>
                        <Typography variant="h2" color="secondary.light" textAlign="center">{t('hero.subtitle')}</Typography>
                        
                        <Grid2 container display="flex" justifyContent="center" spacing={3} pt={4}> 
                            <Grid item xs={12} md={4} display="flex" justifyContent="center">
                                <Box width="100%">
                                    <StyledButton onClick={() => handleDownloadCV(CV)}>
                                        <CloudDownloadIcon />
                                        <Typography>{t('hero.downloadCV')}</Typography>
                                    </StyledButton>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4} display="flex" justifyContent="center">
                                <Box position="relative" width="100%" sx={{ zIndex: 1 }}>
                                    <div
                                        ref={buttonRef}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <StyledButton onClick={handleContactClick}>
                                            <ContactMailIcon /> 
                                            <Typography>{t('hero.contact')}</Typography>
                                        </StyledButton>
                                    </div>
                                    {!isMobile && (
                                        <Box
                                            ref={menuRef}
                                            position="absolute"
                                            width="100%"
                                            sx={{ marginTop: '8px' }}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <Collapse in={open} timeout="auto">
                                                <ContactMenu>
                                                    <ContactOption onClick={handleLinkedInClick}>
                                                        <LinkedInIcon className="linkedin" />
                                                        <Typography>{t('hero.linkedin')}</Typography>
                                                    </ContactOption>
                                                    <ContactOption onClick={handleEmailClick}>
                                                        <EmailIcon className="email" />
                                                        <Typography>{t('hero.email')}</Typography>
                                                    </ContactOption>
                                                    <ContactOption onClick={handleWhatsAppClick}>
                                                        <WhatsAppIcon className="whatsapp" />
                                                        <Typography>{t('hero.whatsapp')}</Typography>
                                                    </ContactOption>
                                                </ContactMenu>
                                            </Collapse>
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        </Grid2>
                    </Grid>
                </Grid>
            </Container>
        </StyledHero>
    )
}

export default Hero
  