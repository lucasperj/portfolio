import { styled } from "@mui/material"

interface StyledButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    children: React.ReactNode
}

// Botão estilizado com visual moderno, bordas arredondadas, borda grossa e sombra
const StyledButton: React.FC<StyledButtonProps> = ({children, onClick}) => {
    const ModernButton = styled("button")(({theme})=> ({
        backgroundColor: "transparent",
        border: `2px solid ${theme.palette.primary.contrastText}`,
        borderRadius: '16px', // Bordas mais arredondadas
        padding: "8px 20px", // Padding mais próximo do padrão MUI
        width: "100%",
        color: theme.palette.primary.contrastText,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)', // Sombra leve
        fontWeight: 600,
        fontSize: '1rem',
        transition: 'all 0.2s',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)', // Sombra mais forte no hover
            borderColor: theme.palette.secondary.main
        },
        '& .MuiSvgIcon-root': {
            fontSize: '20px' // Ícones menores
        }
    }))
    
    return (
      <>
        <ModernButton onClick={onClick}>{children}</ModernButton>
      </>
    )
  }
  
  export default StyledButton
  