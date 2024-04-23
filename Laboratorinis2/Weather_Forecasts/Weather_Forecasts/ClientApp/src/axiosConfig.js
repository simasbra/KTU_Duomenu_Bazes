import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://localhost:7022';

const axiosInstance = axios.create({
    baseURL: baseURL
});

export default axiosInstance;
