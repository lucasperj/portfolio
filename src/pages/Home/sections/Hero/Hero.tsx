import { Box, Container, Grid2, styled, Typography, Popover, useTheme, useMediaQuery, IconButton } from "@mui/material"
import Grid from '@mui/material/Grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { toast } from 'react-toastify';
import { useState } from "react";

import Avatar from "../../../../assets/images/avatar.jpg"
import StyledButton from "../../../../components/StyledButton/StyledButton";
import { AnimatedBackground } from "../../../../components/AnimatedBackground/AnimatedBackground";
import CV from "../../../../assets/files/cv_en.pdf"

const ContactMenu = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
}));

const ContactOption = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    cursor: 'pointer',
    borderRadius: theme.shape.borderRadius,
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const Hero = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const StyledHero = styled("div")(({theme})=> ({
        backgroundColor: theme.palette.primary.main,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.up('xs')]: { // <= mobile
            paddingTop: "100px",

        },
        [theme.breakpoints.up('md')]: { // >=mobile
            paddingTop: "0",
        }
    }))

    const StyledImg = styled("img")(({theme})=> ({
        width: "75%",
        borderRadius: "50%",
        border: `1px solid ${theme.palette.primary.contrastText}`,
    }))

    let lastDownloadTime = 0;
    const COOLDOWN_TIME = 10000; // 10 segundos em milissegundos

    const handleDownloadCV = async () => {
        try {
            // Verificar o cooldown
            const currentTime = Date.now();
            const timeSinceLastDownload = currentTime - lastDownloadTime;
            
            if (timeSinceLastDownload < COOLDOWN_TIME) {
                const remainingTime = Math.ceil((COOLDOWN_TIME - timeSinceLastDownload) / 1000);
                toast.warning(`Aguarde ${remainingTime} segundos para baixar novamente`);
                return;
            }

            // Verificar conexão com internet
            if (!navigator.onLine) {
                toast.error('Sem conexão com a internet. Verifique sua conexão e tente novamente.');
                return;
            }

            // Criar e clicar no link
            const link = document.createElement('a');
            link.href = CV;
            link.download = 'Lucas_Falcao_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Atualizar o tempo do último download
            lastDownloadTime = currentTime;
            
            toast.success('Download iniciado com sucesso!');
        } catch (error) {
            console.error('Erro ao fazer download:', error);
            toast.error('Ocorreu um erro ao fazer o download. Tente novamente mais tarde.');
        }
    };

    const handleContactClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isMobile) {
            // No mobile, abre direto o WhatsApp
            window.open('https://wa.me/5521994967386', '_blank');
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLinkedInClick = () => {
        window.open('https://www.linkedin.com/in/lucas-falcão/', '_blank');
        handleClose();
    };

    const handleEmailClick = () => {
        window.location.href = 'mailto:lucasfalcaorj@outlook.com';
        handleClose();
    };

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/5521994967386', '_blank');
        handleClose();
    };

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
                                <StyledButton onClick={handleDownloadCV}>
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
  