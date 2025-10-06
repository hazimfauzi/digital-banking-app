import axios from 'axios';

const defaultApi = axios.create({
    baseURL: 'https://mock.digitalbank.local', // dummy base URL, not actually used
    timeout: 1000,
});

export { defaultApi };

