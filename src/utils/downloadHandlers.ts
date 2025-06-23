// Funções utilitárias para exibir toasts
import { showSuccessToast, showErrorToast, showWarningToast } from './toastHandlers';

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
            showWarningToast(`Aguarde ${remainingTime} segundos para baixar novamente`);
            return;
        }

        // Verifica conexão com a internet
        if (!navigator.onLine) {
            showErrorToast('Sem conexão com a internet. Verifique sua conexão e tente novamente.');
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
        showSuccessToast('Download iniciado com sucesso!');
    } catch (error) {
        console.error('Erro ao fazer download:', error);
        showErrorToast('Ocorreu um erro ao fazer o download. Tente novamente mais tarde.');
    }
}; 