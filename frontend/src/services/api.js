import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // This is important for session handling
});

export const userService = {
    login: (credentials) => api.post('/login', credentials),
    register: (userData) => api.post('/addUser', userData),
    editUser: (userData) => api.post('/editUser', userData),
    getUserProfile: () => api.get('/userProfile'),
    logout: () => api.get('/logout'),
};

export const rideService = {
    offerRide: (rideData) => api.post('/offerRide', rideData),
    findRides: (searchParams) => api.post('/findRide', searchParams),
    getMyOfferedRides: () => api.get('/userOfferRide'),
};

// Add an interceptor to handle errors
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // Handle specific error cases
            switch (error.response.status) {
                case 401:
                    // Unauthorized - redirect to login
                    window.location.href = '/login';
                    break;
                case 403:
                    // Forbidden
                    console.error('Access denied');
                    break;
                default:
                    console.error('API Error:', error.response.data);
            }
        }
        return Promise.reject(error);
    }
);

// Add an interceptor to handle auth token
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
