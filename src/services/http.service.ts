import axios from 'axios'

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
console.log(BASE_API_URL);

export const http = axios.create (
    {
        baseURL: BASE_API_URL
    }
);