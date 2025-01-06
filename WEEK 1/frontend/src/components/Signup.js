import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './common.css';

function Signup() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
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
                body: JSON.stringify({ firstname, lastname, age, gender, email, password }),
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
                React.createElement('label', { htmlFor: 'firstname' }, 'First Name:'),
                React.createElement('input', {
                    id: 'firstname',
                    type: 'text',
                    value: firstname,
                    onChange: (e) => setFirstname(e.target.value),
                    required: true,
                    className: 'form-control',
                })
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('label', { htmlFor: 'lastname' }, 'Last Name:'),
                React.createElement('input', {
                    id: 'lastname',
                    type: 'text',
                    value: lastname,
                    onChange: (e) => setLastname(e.target.value),
                    required: true,
                    className: 'form-control',
                })
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('label', { htmlFor: 'age' }, 'Age:'),
                React.createElement('input', {
                    id: 'age',
                    type: 'number',
                    value: age,
                    onChange: (e) => setAge(e.target.value),
                    required: true,
                    className: 'form-control',
                })
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('label', { htmlFor: 'gender' }, 'Gender:'),
                React.createElement('select', {
                    id: 'gender',
                    value: gender,
                    onChange: (e) => setGender(e.target.value),
                    required: true,
                    className: 'form-control',
                },
                    React.createElement('option', { value: '' }, 'Select Gender'),
                    React.createElement('option', { value: 'Male' }, 'Male'),
                    React.createElement('option', { value: 'Female' }, 'Female'),
                    React.createElement('option', { value: 'Other' }, 'Other')
                )
            ),
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
                    autoComplete: 'email',
                })
            ),
            React.createElement(
                'div',
                { className: 'form-group' },
                React.createElement('label', { htmlFor: 'password' }, 'Password:'),
                React.createElement('input', {
                    id: 'password',
                    type: 'password',
                    name: 'password',
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
