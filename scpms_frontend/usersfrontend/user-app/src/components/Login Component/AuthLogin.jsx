import { useId, useState } from "react";
import { useAuth } from "./UseAuth";
import { useNavigate } from "react-router-dom";
import "./AuthLoginCss.css"
import { GetTeacherByUserEmail, GetUserById } from "../apis";

const AuthLogin = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_DIRECT_BACKEND_URL;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true);
        setError('');

        try {
            console.log("email", formData.username);
            
            // Use fetch instead of form action
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            
            // Handle successful login
            // Store token, update auth state, redirect etc.
            console.log('Login successful:', data);
            
            // Example: if your login returns a token
            if (data.token) {
                localStorage.setItem('token', data.token);
                // Update auth context
                login(data);
                // Redirect to dashboard
                navigate('/dashboard');
            }

        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Welcome Back</h2>
                <form onSubmit={handleSubmit}> {/* Changed to onSubmit */}
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input
                            type="email"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="login-links">
                    <a href="/SENDOTP">Forgot Password?</a>
                    <a href="/SEND-OPT-FOR-SIGNUP">Create Account</a>
                </div>
            </div>
        </div>
    );
};

export default AuthLogin;