import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://matafome-api.ashyfield-34914be1.brazilsouth.azurecontainerapps.io/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
