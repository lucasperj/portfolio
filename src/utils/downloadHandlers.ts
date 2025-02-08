import { toast } from 'react-toastify';

let lastDownloadTime = 0;
const COOLDOWN_TIME = 10000;

export const handleDownloadCV = async (cvPath: string) => {
    try {
        const currentTime = Date.now();
        const timeSinceLastDownload = currentTime - lastDownloadTime;
        
        if (timeSinceLastDownload < COOLDOWN_TIME) {
            const remainingTime = Math.ceil((COOLDOWN_TIME - timeSinceLastDownload) / 1000);
            toast.warning(`Aguarde ${remainingTime} segundos para baixar novamente`);
            return;
        }

        if (!navigator.onLine) {
            toast.error('Sem conexão com a internet. Verifique sua conexão e tente novamente.');
            return;
        }

        const link = document.createElement('a');
        link.href = cvPath;
        link.download = 'Lucas_Falcao_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        lastDownloadTime = currentTime;
        toast.success('Download iniciado com sucesso!');
    } catch (error) {
        console.error('Erro ao fazer download:', error);
        toast.error('Ocorreu um erro ao fazer o download. Tente novamente mais tarde.');
    }
}; 