import axios from 'axios';

export const BackendClient = axios.create({
    baseURL: `https://f6c2-2804-1dc-4085-0-10d7-7f8c-8095-c03f.ngrok-free.app/api/v1`,
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
    },
    timeout: 10000,
});