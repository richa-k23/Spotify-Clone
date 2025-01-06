import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MusicContext } from '../Context';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Navbar.css';
import Card from './Card'; // Import Card component

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
    const musicContext = useContext(MusicContext);
    const likedMusic = musicContext.likedMusic || [];
    const pinnedMusic = musicContext.pinnedMusic || [];

    const [showLikedModal, setShowLikedModal] = useState(false);
    const [showPinnedModal, setShowPinnedModal] = useState(false);

    const likedCount = likedMusic.length;
    const pinnedCount = pinnedMusic.length;

    const handleCloseLikedModal = () => setShowLikedModal(false);
    const handleClosePinnedModal = () => setShowPinnedModal(false);

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
                                onClick: fetchMusicData,
                                className: 'btn btn-outline-success',
                            },
                            'Search'
                        ),
                        React.createElement(
                            'button',
                            {
                                onClick: () => setShowLikedModal(true),
                                className: 'btn btn-outline-light mx-2 position-relative',
                            },
                            React.createElement('i', { className: 'bi bi-heart' }),
                            React.createElement(
                                'span',
                                { className: 'badge position-absolute badge-like' },
                                likedCount
                            )
                        ),
                        React.createElement(
                            'button',
                            {
                                onClick: () => setShowPinnedModal(true),
                                className: 'btn btn-outline-light position-relative',
                            },
                            React.createElement('i', { className: 'bi bi-pin' }),
                            React.createElement(
                                'span',
                                { className: 'badge position-absolute badge-pin' },
                                pinnedCount
                            )
                        )
                    )
                )
            )
        ),
        // Full-Screen Modal for liked music
        React.createElement(
            Modal,
            {
                show: showLikedModal,
                onHide: handleCloseLikedModal,
                dialogClassName: 'fullscreen-modal',
                centered: true,
            },
            React.createElement(
                Modal.Header,
                { closeButton: true, className: 'bg-dark text-white' },
                React.createElement('h5', null, 'Liked Music')
            ),
            React.createElement(
                Modal.Body,
                { className: 'bg-dark text-white card-container' }, // Applying the card-container class
                likedMusic.length > 0
                    ? React.createElement(
                          'div',
                          { className: 'row g-3' },
                          likedMusic.map((song, index) =>
                              React.createElement(
                                  'div',
                                  { key: index, className: 'col-md-4 card-item' }, // Applying card-item class
                                  React.createElement(Card, { element: song })
                              )
                          )
                      )
                    : React.createElement(
                          'div',
                          { className: 'd-flex flex-column justify-content-center align-items-center' },
                          React.createElement('i', { className: 'bi bi-emoji-frown fs-1 text-white' }),
                          React.createElement('p', { className: 'text-white mt-3' }, 'No liked music yet!')
                      )
            ),
            React.createElement(
                Modal.Footer,
                { className: 'bg-dark' },
                React.createElement(
                    Button,
                    { variant: 'secondary', onClick: handleCloseLikedModal },
                    'Close'
                )
            )
        ),
        // Full-Screen Modal for pinned music
        React.createElement(
            Modal,
            {
                show: showPinnedModal,
                onHide: handleClosePinnedModal,
                dialogClassName: 'fullscreen-modal',
                centered: true,
            },
            React.createElement(
                Modal.Header,
                { closeButton: true, className: 'bg-dark text-white' },
                React.createElement('h5', null, 'Pinned Music')
            ),
            React.createElement(
                Modal.Body,
                { className: 'bg-dark text-white card-container' }, // Applying the card-container class
                pinnedMusic.length > 0
                    ? React.createElement(
                          'div',
                          { className: 'row g-3' },
                          pinnedMusic.map((song, index) =>
                              React.createElement(
                                  'div',
                                  { key: index, className: 'col-md-4 card-item' }, // Applying card-item class
                                  React.createElement(Card, { element: song })
                              )
                          )
                      )
                    : React.createElement(
                          'div',
                          { className: 'd-flex flex-column justify-content-center align-items-center' },
                          React.createElement('i', { className: 'bi bi-emoji-frown fs-1 text-white' }),
                          React.createElement('p', { className: 'text-white mt-3' }, 'No pinned music yet!')
                      )
            ),
            React.createElement(
                Modal.Footer,
                { className: 'bg-dark' },
                React.createElement(
                    Button,
                    { variant: 'secondary', onClick: handleClosePinnedModal },
                    'Close'
                )
            )
        )
    );
};

export default Navbar;
