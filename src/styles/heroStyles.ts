import { styled } from "@mui/material";

export const StyledHero = styled("div")(({theme})=> ({
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up('xs')]: {
        paddingTop: "100px",
    },
    [theme.breakpoints.up('md')]: {
        paddingTop: "0",
    }
}));

export const StyledImg = styled("img")(({theme})=> ({
    width: "75%",
    borderRadius: "50%",
    border: `1px solid ${theme.palette.primary.contrastText}`,
}));

export const ContactMenu = styled("div")(({theme}) => ({
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: '16px',
    minWidth: '200px',
    boxShadow: theme.shadows[4]
}));

export const ContactOption = styled("div")(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1.5),
    cursor: 'pointer',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '& .MuiSvgIcon-root.linkedin': {
        color: '#0A66C2'
    },
    '& .MuiSvgIcon-root.email': {
        color: '#EA4335'
    },
    '& .MuiSvgIcon-root.whatsapp': {
        color: '#25D366'
    }
})); 