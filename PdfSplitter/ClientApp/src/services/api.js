import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44380',
});

export default api;