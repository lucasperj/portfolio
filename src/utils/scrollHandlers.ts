export const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
        const isMobile = window.innerWidth < 600;
        const navbarHeight = 64; // altura da navbar
        
        if (sectionId === 'projects') {
            // Ajusta o scroll para mostrar apenas a seção de projetos
            const sectionTop = section.offsetTop;
            
            window.scrollTo({
                top: sectionTop - navbarHeight,  // Subtrai apenas a altura da navbar
                behavior: 'smooth'
            });
            return;
        }

        // Offset específico para seções com título
        if (sectionId === 'quality' || sectionId === 'about') {
            const sectionTitle = section.querySelector('h2'); // Pegando o título da seção
            if (sectionTitle) {
                const titlePosition = sectionTitle.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: titlePosition - navbarHeight - (isMobile ? 20 : 40),
                    behavior: 'smooth'
                });
                return;
            }
        }

        // Para outras seções, mantém o comportamento padrão
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - (isMobile ? 20 : 40);

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}; 