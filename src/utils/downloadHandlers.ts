// Funções utilitárias para exibir toasts
import { showSuccessToast, showErrorToast, showWarningToast } from './toastHandlers';
import { translate } from '../i18n/useTranslation';

// Variável para controlar o tempo do último download
let lastDownloadTime = 0;
// Tempo de espera entre downloads (em ms)
const COOLDOWN_TIME = 10000;

// Função para lidar com o download do CV
export const handleDownloadCV = async (cvPath: string) => {
    try {
        const currentTime = Date.now();
        const timeSinceLastDownload = currentTime - lastDownloadTime;
        
        // Impede downloads em sequência, respeitando o cooldown
        if (timeSinceLastDownload < COOLDOWN_TIME) {
            const remainingTime = Math.ceil((COOLDOWN_TIME - timeSinceLastDownload) / 1000);
            showWarningToast(translate('toast.cooldown').replace('{seconds}', String(remainingTime)));
            return;
        }

        // Verifica conexão com a internet
        if (!navigator.onLine) {
            showErrorToast(translate('toast.noConnection'));
            return;
        }

        // Cria um link temporário para download do arquivo
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = 'Lucas_Falcao_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Atualiza o tempo do último download
        lastDownloadTime = currentTime;
        showSuccessToast(translate('toast.downloadSuccess'));
    } catch (error) {
        console.error('Erro ao fazer download:', error);
        showErrorToast(translate('toast.downloadError'));
    }
}; 