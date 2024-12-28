import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context';
import './common.css';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Sign-in failed');
            }

            const { token } = await response.json();
            login(token);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSigninRedirect = () => {
        navigate('/signup');
    };

    return React.createElement(
        'div',
        { className: 'signup-container' },
        React.createElement('h2', { className: 'signup-title' }, 'Sign In'),
        error &&
            React.createElement('p', { className: 'error-message' }, error),
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
                    name: 'email',
                    onChange: (e) => setEmail(e.target.value),
                    required: true,
                    className: 'form-control',
                    autoComplete: 'email',
                })
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('label', null, 'Password:'),
                React.createElement('input', {
                    type: 'password',
                    value: password,
                    name: 'password',
                    onChange: (e) => setPassword(e.target.value),
                    required: true,
                    autoComplete: 'current-password',
                    className: 'form-control',
                })
            ),
            React.createElement(
                'button',
                { type: 'submit', className: 'submit-button' },
                'Sign In'
            )
        ),
        React.createElement(
            'button',
            { className: 'signin-redirect-button', onClick: handleSigninRedirect },
            "Don't have an account? Sign Up"
        )
    );
}

export default Signin;
