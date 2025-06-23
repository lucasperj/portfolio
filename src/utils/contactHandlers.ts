// Funções utilitárias para exibir toasts de sucesso e erro
import { showSuccessToast, showErrorToast } from './toastHandlers';
import { translate } from '../i18n/useTranslation';

// Tempo de espera (em ms) para garantir que o usuário leia o toast antes de executar a ação
const DELAY = 2500; // 2,5 segundos para garantir leitura do toast

// Função para checar conexão com a internet antes de executar ações
const checkConnection = () => {
    if (!navigator.onLine) {
        showErrorToast(translate('toast.noConnection'));
        return false;
    }
    return true;
};

// Ação para LinkedIn: mostra toast, espera e abre o perfil
export const handleLinkedInClick = () => {
    if (!checkConnection()) return;
    showSuccessToast(translate('toast.linkedin'));
    setTimeout(() => {
        window.open('https://www.linkedin.com/in/lucas-falcão/', '_blank');
    }, DELAY);
};

// Ação para Email: mostra toast, espera e abre o cliente de email
export const handleEmailClick = () => {
    if (!checkConnection()) return;
    showSuccessToast(translate('toast.email'));
    setTimeout(() => {
        const subject = encodeURIComponent("Contato via Portfolio - Oportunidade de Colaboração");
        const body = encodeURIComponent("Olá Lucas,\n\nEspero que esteja bem!\n\nEncontrei seu portfolio e fiquei muito interessado(a) em seu trabalho como Analista de Qualidade e Automação. Seu perfil chamou minha atenção e gostaria de discutir possíveis oportunidades de colaboração.\n\nPodemos agendar uma conversa?\n\nAguardo seu retorno.\n\nAtenciosamente,");
        window.location.href = `mailto:lucasfalcaorj@outlook.com?subject=${subject}&body=${body}`;
    }, DELAY);
};

// Ação para WhatsApp: mostra toast, espera e abre o chat
export const handleWhatsAppClick = () => {
    if (!checkConnection()) return;
    showSuccessToast(translate('toast.whatsapp'));
    setTimeout(() => {
        const message = encodeURIComponent(`Olá Lucas! \n\nEncontrei seu portfolio e fiquei interessado(a) em seu trabalho como Analista de Qualidade e Automação. Gostaria de conversar sobre possíveis oportunidades de colaboração.\n\nAguardo seu retorno!`);
        window.open(`https://wa.me/5581994967386?text=${message}`, '_blank');
    }, DELAY);
}; 