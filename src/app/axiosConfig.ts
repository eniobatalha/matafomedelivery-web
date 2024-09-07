import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://matafome-api.whiteglacier-7456d729.brazilsouth.azurecontainerapps.io/api',
    // baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
