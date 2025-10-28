import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to signin page
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default api;
