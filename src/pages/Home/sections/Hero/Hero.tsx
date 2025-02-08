import { Box, Container, Grid2, Typography, Popover, useTheme, useMediaQuery} from "@mui/material"
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
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleContactClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isMobile) {
            handleWhatsAppClick();
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);

    return (
      <>
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
                                <StyledButton onClick={() => handleDownloadCV(CV)}>
                                    <CloudDownloadIcon />
                                    <Typography>Download CV</Typography>
                                </StyledButton>
                            </Grid>
                            <Grid item xs={12} md={4} display="flex" justifyContent="center">
                                <StyledButton onClick={handleContactClick}>
                                    <ContactMailIcon /> 
                                    <Typography>Contact me</Typography>
                                </StyledButton>
                                {!isMobile && (
                                    <Popover
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <ContactMenu>
                                            <ContactOption onClick={handleLinkedInClick}>
                                                <LinkedInIcon color="primary" />
                                                <Typography>LinkedIn</Typography>
                                            </ContactOption>
                                            <ContactOption onClick={handleEmailClick}>
                                                <EmailIcon color="primary" />
                                                <Typography>Email</Typography>
                                            </ContactOption>
                                            <ContactOption onClick={handleWhatsAppClick}>
                                                <WhatsAppIcon color="primary" />
                                                <Typography>WhatsApp</Typography>
                                            </ContactOption>
                                        </ContactMenu>
                                    </Popover>
                                )}
                            </Grid>
                        </Grid2>

                    </Grid>
                </Grid>
            </Container>
        </StyledHero>
      </>
    )
  }
  
  export default Hero
  