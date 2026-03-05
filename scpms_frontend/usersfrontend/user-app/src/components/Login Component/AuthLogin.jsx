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
        e.preventDefault();
        setLoading(true);
        setError('');
    }
        console.log("email", formData.username);

                return (
                    <div className="login-container">
                        <div className="login-form">
                            <h2>Welcome Back</h2>
                            {/* <form onSubmit={handleSubmit}> */}
                               <form method="POST" action={`${BASE_URL}/login`}>
                                 <div className="form-group">
                                    <label htmlFor="usename">Email</label>
                                    <input
                                        type="email"
                                        id="email"
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
                                {/* <a href="/">Or login with OAuth2</a> */}
                            </div>
                        </div>
                    </div>
                );
            };

            export default AuthLogin;