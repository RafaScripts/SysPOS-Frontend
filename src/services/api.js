import axios from 'axios';

let baseUrl;

if(window.location.hostname === 'localhost'){
  baseUrl = 'http://localhost:3333';
}else {
  baseUrl = 'https://api.digitalmoon.com';
}

console.log(baseUrl);

const api = axios.create({
    baseURL: `${baseUrl}`
});

export default api;