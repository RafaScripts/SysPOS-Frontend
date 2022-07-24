import axios from 'axios';

const api = axios.create({
    baseURL: 'http://69.164.199.39:8080'
});

export default api;