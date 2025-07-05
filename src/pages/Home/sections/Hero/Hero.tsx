// Importações de componentes do Material-UI, ícones, hooks e utilitários
import { Box, Container, Grid2, Typography, useTheme, useMediaQuery, Collapse, Fab, Tooltip, Zoom } from "@mui/material"
import Grid from '@mui/material/Grid';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useState, useRef } from "react";
import { useTranslation } from '../../../../i18n/useTranslation';

// Importação de imagem de avatar, botão customizado, fundo animado e utilitários
import Avatar from "../../../../assets/images/avatar.jpg"
import StyledButton from "../../../../components/common/StyledButton/StyledButton";
import { AnimatedBackground } from "../../../../components/common/AnimatedBackground/AnimatedBackground";
import { handleDownloadCV } from "../../../../utils/downloadHandlers";
import { handleLinkedInClick, handleEmailClick, handleWhatsAppClick } from "../../../../utils/contactHandlers";
import { StyledHero, StyledImg, ContactMenu, ContactOption } from "../../../../styles/heroStyles";
import CV from "../../../../assets/files/cv_en.pdf"
import RecommendationsCarousel from '../../../../components/home/RecommendationsCarousel';

// Componente principal da seção Hero
const Hero = () => {
    // Estado para controlar a abertura do dropdown de contato
    const [open, setOpen] = useState(false);
    // Refs para detectar mouse sobre botão/menu de contato
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    // Hooks do Material-UI para tema e responsividade
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    // Hook de tradução para textos dinâmicos
    const { t } = useTranslation();

    // Função chamada ao clicar no botão de contato
    // No mobile, já abre o WhatsApp; no desktop, abre/fecha o dropdown
    const handleContactClick = () => {
        if (isMobile) {
            handleWhatsAppClick();
        } else {
            setOpen(!open);
        }
    };

    // Função para abrir o dropdown ao passar o mouse sobre o botão/menu
    const handleMouseEnter = () => {
        setOpen(true);
    };
    // Função para fechar o dropdown ao sair do botão/menu
    // Só fecha se o mouse sair de ambos (botão e menu)
    const handleMouseLeave = (e: React.MouseEvent) => {
        if (!buttonRef.current || !menuRef.current) {
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
            setOpen(false);
        }
    };

    // Renderização do componente Hero
    return (
        // Container principal estilizado
        <StyledHero> 
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    {/* Coluna da foto/avatar com fundo animado */}
                    <Grid item xs={12} md={5}>
                        <Box position="relative"> 
                            {/* Fundo animado atrás do avatar */}
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
                                {/* Imagem de avatar */}
                                <StyledImg src={Avatar} alt="Foto do Lucas"/> 
                            </Box>
                        </Box>
                    </Grid>
                    {/* Coluna do texto e carrossel */}
                    <Grid item xs={12} md={7}>
                        {/* Nome e subtítulo traduzidos */}
                        <Typography variant="h1" color="primary.contrastText" textAlign="center" pb={2}>{t('hero.name')}</Typography>
                        <Typography variant="h2" color="secondary.light" textAlign="center">{t('hero.subtitle')}</Typography>
                        {/* Carrossel de recomendações */}
                        <Box mt={0}>
                            <RecommendationsCarousel />
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Botões de ação fixos no lado direito */}
            <Box
                sx={{
                    position: 'fixed',
                    right: 32,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1300,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {/* Botão de download do CV */}
                <Tooltip title={t('hero.downloadCV')} placement="left">
                    <Fab
                        data-test-id="download-cv-button"
                        color="primary"
                        aria-label="download cv"
                        onClick={() => handleDownloadCV(CV)}
                        sx={{
                            backgroundColor: '#fff',
                            color: '#7c3aed',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                            transition: 'background 0.2s, color 0.2s',
                            '&:hover': {
                                backgroundColor: '#7c3aed',
                                color: '#fff',
                            },
                        }}
                    >
                        <FileDownloadRoundedIcon />
                    </Fab>
                </Tooltip>

                {/* Botão de contato com dropdown */}
                <Box position="relative">
                    <Tooltip title={t('hero.contact')} placement="left">
                        <Fab
                            data-test-id="contact-main-button"
                            color="primary"
                            aria-label="contato"
                            onClick={handleContactClick}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            ref={buttonRef}
                            sx={{
                                backgroundColor: '#fff',
                                color: '#7c3aed',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                                transition: 'background 0.2s, color 0.2s',
                                '&:hover': {
                                    backgroundColor: '#7c3aed',
                                    color: '#fff',
                                },
                            }}
                        >
                            <EmailRoundedIcon />
                        </Fab>
                    </Tooltip>

                    {/* Dropdown de opções de contato (apenas desktop) */}
                    {!isMobile && (
                        <Box
                            ref={menuRef}
                            position="absolute"
                            right="100%"
                            top="50%"
                            sx={{ 
                                marginRight: 2, 
                                zIndex: 1301,
                                transform: 'translateY(-50%)'
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Collapse in={open} timeout="auto">
                                <ContactMenu>
                                    {/* Opção WhatsApp */}
                                    <ContactOption onClick={handleWhatsAppClick} data-test-id="contact-whatsapp-option">
                                        <WhatsAppIcon className="whatsapp" />
                                        <Typography>{t('hero.whatsapp')}</Typography>
                                    </ContactOption>
                                    {/* Opção LinkedIn */}
                                    <ContactOption onClick={handleLinkedInClick} data-test-id="contact-linkedin-option">
                                        <LinkedInIcon className="linkedin" />
                                        <Typography>{t('hero.linkedin')}</Typography>
                                    </ContactOption>
                                    {/* Opção Email */}
                                    <ContactOption onClick={handleEmailClick} data-test-id="contact-email-option">
                                        <EmailIcon className="email" />
                                        <Typography>{t('hero.email')}</Typography>
                                    </ContactOption>
                                </ContactMenu>
                            </Collapse>
                        </Box>
                    )}
                </Box>
            </Box>
        </StyledHero>
    )
}

export default Hero
