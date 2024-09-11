import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://matafome-api.whiteglacier-7456d729.brazilsouth.azurecontainerapps.io/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        let errorMessage = 'Erro desconhecido. Por favor, tente novamente.';

        if (axios.isAxiosError(error)) {
            if (error.response) {
                const statusCode = error.response.status;

                switch (statusCode) {
                    case 400:
                        errorMessage = 'Requisição inválida. Verifique os dados enviados.';
                        break;
                    case 401:
                        errorMessage = 'Não autorizado. Verifique suas credenciais.';
                        break;
                    case 404:
                        errorMessage = 'Recurso não encontrado.';
                        break;
                    case 500:
                        const fullMessage = error.response.request.response || 'Erro no servidor.';
                        const duplicateKeyMatch = fullMessage.match(/duplicate key value violates unique constraint "usuario_username_key"/);
                        
                        // Verificação para o e-mail já usado.
                        if (duplicateKeyMatch) {
                            const emailMatch = fullMessage.match(/Key \(username\)=\((.*?)\)/);
                            const email = emailMatch ? emailMatch[1] : 'desconhecido';
                            errorMessage = `Já existe uma empresa registrada com esse e-mail: ${email}`;
                        }
                        // Verificação para o CNPJ já usado.
                        else if (fullMessage.match(/Key \(cnpj\)=\((.*?)\)/)) {
                            const cnpjMatch = fullMessage.match(/Key \(cnpj\)=\((.*?)\)/);
                            const cnpj = cnpjMatch ? cnpjMatch[1] : 'desconhecido';
                            errorMessage = `Já existe uma empresa registrada com esse CNPJ: ${cnpj}`;
                        }
                        else {
                            errorMessage = fullMessage;
                        }
                        break;
                    default:
                        errorMessage = `Erro inesperado: ${statusCode}. Tente novamente.`;
                }
            } else if (error.request) {
                errorMessage = 'Servidor não respondeu. Verifique sua conexão.';
            } else {
                errorMessage = `Erro ao configurar a requisição: ${error.message}`;
            }
        }

        return Promise.reject(new Error(errorMessage));
    }
);

export default axiosInstance;
