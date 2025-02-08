import { styled } from "@mui/material"

interface StyledButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    children: React.ReactNode
}


const StyledButton: React.FC<StyledButtonProps> = ({children, onClick}) => {
    const StyledButton = styled("button")(({theme})=> ({
        backgroundColor: "transparent",
        border: `1px solid ${theme.palette.primary.contrastText}`, 
        borderRadius: "16px",
        padding: "5px 15px",
        width: "100%",
        color: theme.palette.primary.contrastText,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        '&:hover': {
            backgroundColor: theme.palette.secondary.main
        }
    }))
    
    return (
      <>
        <StyledButton onClick={onClick}>{children}</StyledButton>
      </>
    )
  }
  
  export default StyledButton
  