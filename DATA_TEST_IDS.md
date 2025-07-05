# DATA_TEST_IDS.md

# Lista de data-test-id utilizados no projeto

## Hero Section
- download-cv-button: Botão de download do currículo
- contact-main-button: Botão principal de contato
- contact-linkedin-option: Opção de contato LinkedIn
- contact-email-option: Opção de contato Email
- contact-whatsapp-option: Opção de contato WhatsApp

## NavBar
- navbar-qalab-button: Botão "FalQAo Lab"
- navbar-aboutme-button: Botão "Descubra mais sobre mim"
- navbar-about-button: Botão "Sobre"
- navbar-quality-button: Botão "Qualidade"
- navbar-projects-button: Botão "Projetos"
- navbar-articles-button: Botão "Artigos" (QA Lab)
- navbar-challenges-button: Botão "Desafios" (QA Lab)
- navbar-qalab-projects-button: Botão "Projetos" (QA Lab)

## Quality Section
- quality-cta-button: Botão CTA para desafios
- expand-more-quality-0, expand-more-quality-1, ...: Botão de expandir/colapsar de cada tópico de qualidade (apenas no componente ExpandMore, nunca no ExpandMoreIcon)

## Challenges Section
- challenge-option-0, challenge-option-1, ...: Opções de resposta dos desafios
- challenge-reset-button: Botão de reset/finalizar desafios

## StyledButton
- dataTestId: Prop para definir data-test-id único em cada uso do botão

## AnimatedSection
- dataTestId: Prop para definir data-test-id único em cada uso da seção animada

## ExperienceTimeline
- experience-timeline-item-0, experience-timeline-item-1, ...: Cada item da timeline

## Projects Section
- project-card-0, project-card-1, ...: Cada card de projeto
- project-github-button: Botão/link para GitHub
- project-linkedin-button: Botão/link para LinkedIn

## LanguageSelector
- language-selector: Select principal de idiomas
- language-option-pt: Opção de idioma Português
- language-option-en: Opção de idioma Inglês
- language-option-es: Opção de idioma Espanhol

## ScrollToTopButton
- scroll-to-top-button: Botão flutuante de voltar ao topo
- scroll-to-top-tooltip: Tooltip do botão de voltar ao topo

**Observação:**
Nunca adicione data-test-id em ícones ou elementos puramente visuais, apenas em botões/elementos interativos principais. 