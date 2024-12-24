import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './common.css';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                navigate('/signin');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Sign-up failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        }
    };

    const handleSigninRedirect = () => {
        navigate('/signin');
    };

    return React.createElement(
        'div',
        { className: 'signup-container' },
        React.createElement('h2', { className: 'signup-title' }, 'Create Your Account'),
        error &&
            React.createElement(
                'p',
                { className: 'error-message' },
                error
            ),
        React.createElement(
            'form',
            { className: 'signup-form', onSubmit: handleSubmit },
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('label', { htmlFor: 'email' }, 'Email:'),
                React.createElement('input', {
                    id: 'email',
                    type: 'email',
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    required: true,
                    className: 'form-control',
                })
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('label', { htmlFor: 'password' }, 'Password:'),
                React.createElement('input', {
                    id: 'password',
                    type: 'password',
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    required: true,
                    className: 'form-control',
                })
            ),
            React.createElement(
                'button',
                { type: 'submit', className: 'submit-button' },
                'Sign Up'
            )
        ),
        React.createElement(
            'button',
            { className: 'signin-redirect-button', onClick: handleSigninRedirect },
            'Already have an account? Sign In'
        )
    );
}

export default Signup;
