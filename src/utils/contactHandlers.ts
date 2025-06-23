// Funções utilitárias para exibir toasts de sucesso e erro
import { showSuccessToast, showErrorToast } from './toastHandlers';

// Tempo de espera (em ms) para garantir que o usuário leia o toast antes de executar a ação
const DELAY = 2000; // 2 segundos para garantir leitura do toast

// Função para checar conexão com a internet antes de executar ações
const checkConnection = () => {
    if (!navigator.onLine) {
        showErrorToast('Sem conexão com a internet. Verifique sua conexão e tente novamente.');
        return false;
    }
    return true;
};

// Ação para LinkedIn: mostra toast, espera e abre o perfil
export const handleLinkedInClick = () => {
    if (!checkConnection()) return;
    showSuccessToast('Obrigado pelo interesse! Responderei sua mensagem em breve! 😊');
    setTimeout(() => {
        window.open('https://www.linkedin.com/in/lucas-falcão/', '_blank');
    }, DELAY);
};

// Ação para Email: mostra toast, espera e abre o cliente de email
export const handleEmailClick = () => {
    if (!checkConnection()) return;
    showSuccessToast('Obrigado pelo contato! Estou ansioso para ler seu email! 📧');
    setTimeout(() => {
        const subject = encodeURIComponent("Contato via Portfolio - Oportunidade de Colaboração");
        const body = encodeURIComponent("Olá Lucas,\n\nEspero que esteja bem!\n\nEncontrei seu portfolio e fiquei muito interessado(a) em seu trabalho como Analista de Qualidade e Automação. Seu perfil chamou minha atenção e gostaria de discutir possíveis oportunidades de colaboração.\n\nPodemos agendar uma conversa?\n\nAguardo seu retorno.\n\nAtenciosamente,");
        window.location.href = `mailto:lucasfalcaorj@outlook.com?subject=${subject}&body=${body}`;
    }, DELAY);
};

// Ação para WhatsApp: mostra toast, espera e abre o chat
export const handleWhatsAppClick = () => {
    if (!checkConnection()) return;
    showSuccessToast('Ótimo! Responderei sua mensagem assim que possível! 💬');
    setTimeout(() => {
        const message = encodeURIComponent(`Olá Lucas! \n\nEncontrei seu portfolio e fiquei interessado(a) em seu trabalho como Analista de Qualidade e Automação. Gostaria de conversar sobre possíveis oportunidades de colaboração.\n\nAguardo seu retorno!`);
        window.open(`https://wa.me/5581994967386?text=${message}`, '_blank');
    }, DELAY);
}; 