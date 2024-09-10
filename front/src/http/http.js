import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request sent: ', config);
        return config;
    },
    (error) => {

        console.error('Request error: ', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {

        console.log('Response received: ', response);
        return response;
    },
    (error) => {

        if (error.response) {

            console.error('Response error: ', error.response.data);
            if (error.response.status === 401) {

            }
        } else if (error.request) {

            console.error('No response received: ', error.request);
        } else {

            console.error('Request setup error: ', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
