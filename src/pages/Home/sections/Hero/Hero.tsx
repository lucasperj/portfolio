import { Box, Container, Grid2, styled, Typography } from "@mui/material"
import Grid from '@mui/material/Grid';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ContactMailIcon from '@mui/icons-material/ContactMail';


import Avatar from "../../../../assets/images/avatar.jpg"
import StyledButton from "../../../../components/StyledButton/StyledButton";
import { AnimatedBackground } from "../../../../components/AnimatedBackground/AnimatedBackground";

const Hero = () => {

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
                            <Box position="relative" textAlign="center"> 
                                <StyledImg src={Avatar} alt="Foto do Lucas"/> 
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h1" color="primary.contrastText" textAlign="center" pb={2}>Lucas Falcão</Typography>
                        <Typography variant="h2" color="secondary.light" textAlign="center">I'm a Automation and Quality Analyst</Typography>
                        
                        <Grid2 container display="flex" justifyContent="center" spacing={3} pt={4}> 
                            <Grid item xs={12} md={4} display="flex" justifyContent="center">
                                <StyledButton> 
                                    <CloudDownloadIcon />
                                    <Typography>Download CV</Typography>
                                    
                                </StyledButton>
                            </Grid>
                            <Grid item xs={12} md={4} display="flex" justifyContent="center">
                                <StyledButton>
                                    <ContactMailIcon /> 
                                    <Typography>Contact me</Typography>
                                </StyledButton>
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
  