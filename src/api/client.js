import axios from 'axios';

// Base API Configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 (Unauthorized)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            // Network Error (server down, cors, etc)
            console.error('Network Error:', error);
            // We can optionally reject with a custom object
            return Promise.reject({ message: 'Network Error: Cannot reach server. Is the backend running?' });
        }
        if (error.response.status === 401 || error.response.status === 403) {
            // Optional: Redirect to login or clear token
        }
        return Promise.reject(error);
    }
);

export default apiClient;
