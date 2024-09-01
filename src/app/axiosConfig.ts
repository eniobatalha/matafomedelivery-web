import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://168.196.221.89:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
