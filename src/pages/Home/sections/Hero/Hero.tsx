import { Box, Container, Grid2, Typography, useTheme, useMediaQuery, Collapse } from "@mui/material"
import Grid from '@mui/material/Grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useState } from "react";

import Avatar from "../../../../assets/images/avatar.jpg"
import StyledButton from "../../../../components/StyledButton/StyledButton";
import { AnimatedBackground } from "../../../../components/AnimatedBackground/AnimatedBackground";
import { handleDownloadCV } from "../../../../utils/downloadHandlers";
import { handleLinkedInClick, handleEmailClick, handleWhatsAppClick } from "../../../../utils/contactHandlers";
import { StyledHero, StyledImg, ContactMenu, ContactOption } from "../../../../styles/heroStyles";
import CV from "../../../../assets/files/cv_en.pdf"

const Hero = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleContactClick = () => {
        if (isMobile) {
            handleWhatsAppClick();
        } else {
            setOpen(!open);
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
                        <Typography variant="h1" color="primary.contrastText" textAlign="center" pb={2}>Lucas Falcão</Typography>
                        <Typography variant="h2" color="secondary.light" textAlign="center">I'm a Automation and Quality Analyst</Typography>
                        
                        <Grid2 container display="flex" justifyContent="center" spacing={3} pt={4}> 
                            <Grid item xs={12} md={4} display="flex" justifyContent="center">
                                <Box width="100%">
                                    <StyledButton onClick={() => handleDownloadCV(CV)}>
                                        <CloudDownloadIcon />
                                        <Typography>Download CV</Typography>
                                    </StyledButton>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4} display="flex" justifyContent="center">
                                <Box position="relative" width="100%" sx={{ zIndex: 1 }}>
                                    <StyledButton onClick={handleContactClick}>
                                        <ContactMailIcon /> 
                                        <Typography>Contact me</Typography>
                                    </StyledButton>
                                    {!isMobile && (
                                        <Box position="absolute" width="100%" sx={{ marginTop: '8px' }}>
                                            <Collapse in={open} timeout="auto">
                                                <ContactMenu>
                                                    <ContactOption onClick={handleLinkedInClick}>
                                                        <LinkedInIcon className="linkedin" />
                                                        <Typography>LinkedIn</Typography>
                                                    </ContactOption>
                                                    <ContactOption onClick={handleEmailClick}>
                                                        <EmailIcon className="email" />
                                                        <Typography>Email</Typography>
                                                    </ContactOption>
                                                    <ContactOption onClick={handleWhatsAppClick}>
                                                        <WhatsAppIcon className="whatsapp" />
                                                        <Typography>WhatsApp</Typography>
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
  