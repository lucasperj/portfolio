export const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
        const isMobile = window.innerWidth < 600; // breakpoint do Material-UI para xs
        
        // Ajustando offset para esconder completamente a seção Hero quando clicar em About
        const offset = sectionId === 'about' ? 
            (isMobile ? 20 : 50) : // Offset menor para About para mostrar a partir do título
            (isMobile ? 80 : 100); // Offset padrão para outras seções
        
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}; 