import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            'nav',
            { className: 'navbar navbar-expand-lg navbar-custom sticky-top' },
            React.createElement(
                'div',
                { className: 'container-fluid' },
                React.createElement(
                    Link,
                    { className: 'navbar-brand', to: '/' },
                    React.createElement('i', { className: 'bi bi-music-note-list mx-2' }),
                    'Spotify Like'
                ),
                React.createElement(
                    'button',
                    {
                        className: 'navbar-toggler',
                        type: 'button',
                        'data-bs-toggle': 'collapse',
                        'data-bs-target': '#navbarSupportedContent',
                        'aria-controls': 'navbarSupportedContent',
                        'aria-expanded': 'false',
                        'aria-label': 'Toggle navigation',
                    },
                    React.createElement('span', { className: 'navbar-toggler-icon' })
                ),
                React.createElement(
                    'div',
                    { className: 'collapse navbar-collapse', id: 'navbarSupportedContent' },
                    React.createElement(
                        'div',
                        { className: 'd-flex w-100 justify-content-center' },
                        React.createElement('input', {
                            value: keyword,
                            onChange: (event) => setKeyword(event.target.value),
                            onKeyDown: handleKeyPress,
                            className: 'form-control me-2',
                            type: 'search',
                            placeholder: 'Search',
                            'aria-label': 'Search',
                        }),
                        React.createElement(
                            'button',
                            {
                                onClick: () => {
                                    fetchMusicData();
                                },
                                className: 'btn btn-outline-success',
                            },
                            'Search'
                        )
                    )
                )
            )
        )
    );
};

export default Navbar;
