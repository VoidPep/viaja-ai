import axios from 'axios';

const url = 'http://localhost:3000'
//const url = ''

const http = axios.create({
    baseURL: url,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // console.log('Request sent: ', config);
        return config;
    },
    (error) => {

        console.error('Request error: ', error);
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => {

        // console.log('Response received: ', response);
        return response;
    },
    (error) => {

        if (error.response) {

            if (error.response.status === 401) {

            }
        } else if (error.request) {

        } else {

        }

        console.error(error)

        return error;
    }
);

export default http;