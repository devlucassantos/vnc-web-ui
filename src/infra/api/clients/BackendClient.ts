import axios, {AxiosError, AxiosHeaders, AxiosResponse} from 'axios';
import DTO from "@typing/http/DTO";
import StorageController from "../../../core/cache/storage/StorageController";

export const BackendClient = axios.create({
    baseURL: `${process.env.VITE_API_URL ?? '/'}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
    },
    timeout: 10000,
});

BackendClient.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error: AxiosError<DTO>) {
        if (!error.response) return Promise.reject(error);
        const status = error.response.status;
        if (
            status !== 401 ||
            error.response.config.url?.includes('/auth/refresh')
        ) {
            if (
                error.code === 'ECONNABORTED' &&
                error.message.indexOf('timeout') !== -1
            ) {
                return Promise.reject(
                    new Error(
                        'Não foi possível se conectar ao servidor. Por favor, tente novamente mais tarde.'
                    )
                );
            } else {
                return Promise.reject(error);
            }
        }

        const refreshToken = StorageController.get('refresh-token');
        if (!refreshToken) return Promise.reject(error);
        delete BackendClient.defaults.headers.common['Authorization'];
        try {
            const response = await BackendClient.post<DTO>(
                '/auth/refresh',
                {refresh_token: refreshToken},
                {headers: {Authorization: undefined}}
            );

            const {access_token, refresh_token} = response.data;
            StorageController.set('access-token', access_token);
            StorageController.set('refresh-token', refresh_token);
            const authHeader = 'Bearer ' + response.data.access_token;

            if (!error.response.config.headers) {
                error.response.config.headers = new AxiosHeaders();
            }

            error.response.config.headers['Authorization'] = authHeader;
            BackendClient.defaults.headers.common['Authorization'] = authHeader;
            return axios(error.response.config);
        } catch (e) {
            const axiosError = e as AxiosError;
            const response = axiosError.response;
            const data = response?.data as Record<string, unknown>;
            if (String(data?.['message']).toLowerCase().includes('token')) {
                return Promise.reject(
                    new AxiosError(undefined, undefined, undefined, undefined, {
                        ...(response ?? ({} as AxiosResponse)),
                        data: {
                            message: 'A sua sessão expirou. Por favor, entre novamente.',
                        },
                    })
                );
            }
            return Promise.reject(error);
        }
    }
);
