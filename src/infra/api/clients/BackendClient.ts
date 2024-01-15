import axios from 'axios';

export const BackendClient = axios.create({
    baseURL: `${process.env.VITE_API_URL ?? '/'}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
    },
    timeout: 10000,
});
