import { toast } from 'react-toastify';

const checkConnection = () => {
    if (!navigator.onLine) {
        toast.error('Sem conexão com a internet. Verifique sua conexão e tente novamente.');
        return false;
    }
    return true;
};

export const handleLinkedInClick = () => {
    if (!checkConnection()) return;
    window.open('https://www.linkedin.com/in/lucas-falcão/', '_blank');
    toast.success('Obrigado pelo interesse! Responderei sua mensagem em breve! 😊');
};

export const handleEmailClick = () => {
    if (!checkConnection()) return;
    const subject = encodeURIComponent("Contato via Portfolio - Oportunidade de Colaboração");
    const body = encodeURIComponent("Olá Lucas,\n\nEspero que esteja bem!\n\nEncontrei seu portfolio e fiquei muito interessado(a) em seu trabalho como Analista de Qualidade e Automação. Seu perfil chamou minha atenção e gostaria de discutir possíveis oportunidades de colaboração.\n\nPodemos agendar uma conversa?\n\nAguardo seu retorno.\n\nAtenciosamente,");
    window.location.href = `mailto:lucasfalcaorj@outlook.com?subject=${subject}&body=${body}`;
    toast.success('Obrigado pelo contato! Estou ansioso para ler seu email! 📧');
};

export const handleWhatsAppClick = () => {
    if (!checkConnection()) return;
    const message = encodeURIComponent(`Olá Lucas! 

Encontrei seu portfolio e fiquei interessado(a) em seu trabalho como Analista de Qualidade e Automação. Gostaria de conversar sobre possíveis oportunidades de colaboração.

Aguardo seu retorno!`);
    window.open(`https://wa.me/5581994967386?text=${message}`, '_blank');
    toast.success('Ótimo! Responderei sua mensagem assim que possível! 💬');
}; 