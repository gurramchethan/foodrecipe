import React, { useState } from 'react';
import axios from 'axios';

export default function InputForm({ setIsOpen }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let endpoint = isSignUp ? 'signUp' : 'login';
        await axios
            .post(`http://localhost:5000/${endpoint}`, { email, password })
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                setIsOpen(false); // Close the modal on successful login/signup
            })
            .catch((err) => setError(err.response?.data?.error || 'An unexpected error occurred'));
    };

    return (
        <form className="form" onSubmit={handleOnSubmit}>
            <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                    Email address
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="passwordInput"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100 mb-3">
                {isSignUp ? 'Sign Up' : 'Login'}
            </button>
            <p className="mt-3 text-center" style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => setIsSignUp((prev) => !prev)}>
                {isSignUp ? 'Already have an account?' : 'Create new account'}
            </p>
        </form>
    );
}
