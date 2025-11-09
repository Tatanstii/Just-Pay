import axios from 'axios';

export const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

request.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        const headers = config.headers || {};
        headers['Authorization'] = `Bearer ${token}`;
        config.headers = headers;
    }
    return config;
});