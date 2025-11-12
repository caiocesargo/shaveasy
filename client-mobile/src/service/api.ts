import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.140:3333', // sempre substitua pelo IP da sua máquina
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;