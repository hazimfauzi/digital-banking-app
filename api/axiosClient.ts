import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mock.local', // dummy base URL, not actually used
    timeout: 1000,
});

export default api;
