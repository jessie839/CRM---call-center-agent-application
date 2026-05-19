import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundDoodles from '../components/BackgroundDoodles';
import DooctiLogo from '../components/DooctiLogo';
import Logo from '../assets/Doocti-logo-blue.svg';
import '../styles/ForgetPasswordPage.css';

export default function ForgetPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && timer === 0) {
            // Start a 1 min (60s) timer
            setTimer(60);
        }
    };

    return (
        <div className="forget-password-layout">
            <BackgroundDoodles />
            <div className="fp-card-container">
                <button className="fp-back-btn" onClick={() => navigate('/')} type="button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Login
                </button>
                <div className="fp-form-wrapper">
                    <div className="fp-logo">
                        {/* <DooctiLogo className="asterisk-logo-dark" color="var(--accent)" /> */}
                        <img src={Logo} alt="Doocti Logo" style={{ width: '35%' }} />
                    </div>
                    <h2>Reset your password</h2>
                    <p className="fp-desc">Enter the email address associated with your account, and we'll send you a link to reset your password.</p>

                    <form onSubmit={handleSubmit} className="fp-form">
                        <div className="fp-input-group">
                            <label>Email verification</label>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {timer > 0 && (
                            <div className="fp-timer-msg">
                                Re-submit in <span>{formatTime(timer)}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`fp-submit-btn ${timer > 0 ? 'disabled' : ''}`}
                            disabled={timer > 0}
                        >
                            {timer > 0 ? 'Wait to Resubmit' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
