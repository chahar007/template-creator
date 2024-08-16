// ErrorInterceptor.js
import axios from 'axios';
// import { toast } from 'react-toastify';

// Create a new axios instance or use the existing one
const api = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    timeout: 10000,
});

const handleError = (error) => {
    console.log("Error Interceptor Triggered:", error);

    if (error.response) {
        const statusCode = error.response.status;
        const errorMessage = error.response.data.message || 'An unexpected error occurred.';
        // toast.error(`Error: ${errorMessage}`);

        if (statusCode === 401) {
            // Handle unauthorized error (e.g., redirect to login)
            localStorage.setItem("user", '');
            localStorage.setItem("jwt", '');
            localStorage.setItem("tokens", '');
            window.location.href = '/login'; // Redirect to login
        }
    } else if (error.request) {
        // toast.error('Network error, please check your connection.');
    } else {
        // toast.error('Error in request setup.');
    }
    return Promise.reject(error);
};

axios.interceptors.response.use(
    response => response,
    error => handleError(error)
);

// export default api;
