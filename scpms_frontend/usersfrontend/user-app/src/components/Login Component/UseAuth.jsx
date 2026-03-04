import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import decodeJWT from "../apps/decodeJWT"

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};
const BASE_URL = import.meta.env.VITE_DIRECT_BACKEND_URL;
console.log("BASE URL ",BASE_URL)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const userData = localStorage.getItem('user');
            
            if (token && userData) {
                // Set the authorization header
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setUser(JSON.parse(userData));
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

const login = async (username, password) => {
    console.log("AUTH LOGIN PAGE ");
    
    // For AJAX requests, use axios with proper CORS
    try {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const response = await axios.post(`${BASE_URL}/login`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            withCredentials: true
        });
        
        // Process response...
        return response.data;
        
    } catch (error) {
        console.log("Login error:", error);
        
        // Fallback to form submission if axios fails
        if (error.code === 'ERR_NETWORK' || error.message.includes('CORS')) {
            console.log("Falling back to form submission...");
            return fallbackLogin(email, password);
        }
        
        throw error;
    }
};

const fallbackLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        // Create a form that redirects to a special page that can handle the response
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `${BASE_URL}/login-form`; // Special endpoint for form submissions
        form.style.display = 'none';

        // Add inputs...
        
        // Redirect to a page that can process the token and redirect back
        // This requires backend changes to handle form submissions differently
        
        form.submit();
    });
};

    const logout = async () => {
        try {
            await axios.post(`${BASE_URL}/logout`, {}, {
                withCredentials: true
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
            window.location.href = '/login';
        }
    };

    const value = {
        user,
        login,
        logout,
        checkAuthStatus,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};