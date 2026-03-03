import axios from 'axios';
import validateToken from "../components/apps/validateToken";

// Get the backend URL from environment variables
const BACKEND_URL = import.meta.env.VITE_DIRECT_BACKEND_URL || 'http://localhost:8080';

console.log("🌐 Backend URL configured:", BACKEND_URL); // Add this for debugging

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BACKEND_URL, // ✅ Now using the actual value
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ✅ Single unified request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    console.log("🚀 REQUEST INTERCEPTOR - Base URL:", BACKEND_URL);
    console.log("🚀 Request URL:", config.url);
    console.log("🚀 Full URL:", `${BACKEND_URL}${config.url}`);

    if (token) {
      // ✅ Validate token before attaching
      const validation = validateToken(token);
      console.log("🔍 Token validation result:", validation);
      console.log("user id ", validation.payload.id)
      localStorage.setItem("userId", validation.payload.id )

      if (validation.valid) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("✅ Authorization header set with valid token");
      } else {
        console.log("❌ Token invalid:", validation.reason);
      }
    }

    return config;
  },
  (error) => {
    console.log("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor - handle common errors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ RESPONSE INTERCEPTOR - Success:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log("❌ RESPONSE INTERCEPTOR - Error:", {
      status: error.response?.status,
      url: error.config?.url,
      fullUrl: `${BACKEND_URL}${error.config?.url}`, // ✅ Shows complete URL
      data: error.response?.data,
    });

    if (error.response?.status === 401) {
      console.log("🛑 401 Unauthorized detected");
      console.log("🛑 Current token before removal:", localStorage.getItem('access_token'));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;