import axios from 'axios';
import { Platform } from 'react-native';

const api = axios.create({
    baseURL: Platform.OS === 'web'
        ? 'http://localhost:3333'
        : '',
});

export default api;
