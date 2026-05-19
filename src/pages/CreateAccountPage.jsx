import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/doociti bird.jpeg';
export default function CreateAccountPage({ onLoginSuccess }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loginButtonText, setLoginButtonText] = useState('Get Started');
    const [isAuthenticating, setIsAuthenticating] = useState(false);
 
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setIsAuthenticating(true);
        setLoginButtonText('Authenticating...');
 
        setTimeout(() => {
            setLoginButtonText('Get Started');
            setIsAuthenticating(false);
            onLoginSuccess();
        }, 500);
    };
 
    return (
        <div className="form-wrapper login-form" id="login-form">
            <div className="logo-mobile">
                <img src={logo} alt="Doocti Logo" style={{ width: '75%'}} />
            </div>
            <h2>Sign in to your account</h2>
            <p className="desc">Access your tasks, notes, and projects anytime, anywhere - and keep everything flowing in one place.</p>
 
            <form id="login-form-element" onSubmit={handleLoginSubmit}>
                <div className="input-group">
                    <label>Your email</label>
                    <input type="email" placeholder="email@example.com" defaultValue="demo@example.com" required />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            defaultValue="password"
                            required
                        />
                        <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"></path></svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            )}
                        </span>
                    </div>
                </div>
 
                <button
                    type="submit"
                    className="primary-btn"
                    style={{ opacity: isAuthenticating ? 0.8 : 1 }}
                >
                    {loginButtonText}
                </button>
                <p className="forget-password-link" style={{ cursor: 'pointer' }} onClick={() => navigate('/forget-password')}>Forget Password</p>
            </form>
        </div>
    );
}
 