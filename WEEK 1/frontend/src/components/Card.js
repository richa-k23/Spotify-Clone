import React, { useContext, useEffect, useState } from 'react';
import { MusicContext } from '../Context';
import './Card.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Card({ element }) {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const setLikedMusic = musicContext.setLikedMusic;
  const pinnedMusic = musicContext.pinnedMusic;
  const setPinnedMusic = musicContext.setPinnedMusic;

  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);  // State to track play/pause in card and modal
  const [audio, setAudio] = useState(null);  // Audio element reference

  const handlePin = () => {
    let pinnedMusic = JSON.parse(localStorage.getItem('pinnedMusic')) || [];
    if (pinnedMusic.some((item) => item.id === element.id)) {
      const updatedPinnedMusic = pinnedMusic.filter((item) => item.id !== element.id);
      setPinnedMusic(updatedPinnedMusic);
      localStorage.setItem('pinnedMusic', JSON.stringify(updatedPinnedMusic));
    } else {
      if (pinnedMusic.length < 4) {
        const updatedPinnedMusic = [...pinnedMusic, element];
        setPinnedMusic(updatedPinnedMusic);
        localStorage.setItem('pinnedMusic', JSON.stringify(updatedPinnedMusic));
      }
    }
  };

  const handleLike = () => {
    let likedMusic = JSON.parse(localStorage.getItem('likedMusic')) || [];
    if (likedMusic.some((item) => item.id === element.id)) {
      const updatedLikedMusic = likedMusic.filter((item) => item.id !== element.id);
      setLikedMusic(updatedLikedMusic);
      localStorage.setItem('likedMusic', JSON.stringify(updatedLikedMusic));
    } else {
      const updatedLikedMusic = [...likedMusic, element];
      setLikedMusic(updatedLikedMusic);
      localStorage.setItem('likedMusic', JSON.stringify(updatedLikedMusic));
    }
  };

  useEffect(() => {
    const localLikedMusic = JSON.parse(localStorage.getItem('likedMusic')) || [];
    setLikedMusic(localLikedMusic);
  }, [setLikedMusic]);

  const handleShowModal = () => {
    setShowModal(true);
    setAudio(new Audio(element.preview_url));
  };
  const handleCloseModal = () => {
    setShowModal(false);
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { key: element.id, className: 'col-lg-3 col-md-6 py-2 d-flex align-items-stretch' },
      React.createElement(
        'div',
        { className: 'card bg-dark text-white shadow-lg d-flex flex-column' },
        React.createElement('img', {
          src: element.album.images[0].url,
          className: 'card-img-top',
          alt: element.name,
        }),
        React.createElement(
          'div',
          { className: 'card-body d-flex flex-column' },
          React.createElement(
            'h5',
            { className: 'card-title d-flex justify-content-between align-items-center' },
            React.createElement(
              'span',
              { onClick: handleShowModal, className: 'song-title' },
              element.name
            ),
            React.createElement(
              'div',
              { className: 'add-options d-flex align-items-center' },
              React.createElement(
                'button',
                { onClick: handlePin, className: 'btn btn-sm mx-1' },
                React.createElement('i', {
                  className: `bi ${pinnedMusic.some((item) => item.id === element.id) ? 'bi-pin-angle-fill' : 'bi-pin-angle'} text-white`,
                })
              ),
              React.createElement(
                'button',
                { onClick: handleLike, className: 'btn btn-sm' },
                React.createElement('i', {
                  className: `bi ${likedMusic.some((item) => item.id === element.id) ? 'bi-heart-fill text-danger' : 'bi-heart text-white'}`,
                })
              )
            )
          ),
          React.createElement(
            'p',
            { className: 'card-text' },
            'Artist: ',
            element.album.artists[0].name
          ),
          React.createElement(
            'p',
            { className: 'card-text' },
            'Release date: ',
            element.album.release_date
          ),
          React.createElement(
            'div',
            { className: 'music-controls mb-auto' },
            React.createElement('audio', {
              src: element.preview_url,
              controls: true,
              className: 'w-100',
              onPlay: () => setIsPlaying(true),
              onPause: () => setIsPlaying(false),
            })
          )
        )
      )
    ),
    React.createElement(
      Modal,
      { show: showModal, onHide: handleCloseModal, centered: true, className: 'modal-sm' },
      React.createElement(
        Modal.Header,
        { closeButton: true, className: 'bg-dark text-white' },
        React.createElement(Modal.Title, null, element.name)
      ),
      React.createElement(
        Modal.Body,
        { className: 'bg-dark text-white' },
        React.createElement('img', {
          src: element.album.images[0].url,
          alt: element.name,
          className: 'img-fluid mb-3',
        }),
        React.createElement(
          'div',
          { className: 'audio-controls' },
          React.createElement('audio', {
            src: element.preview_url,
            controls: true,
            className: 'w-100',
            onPlay: () => setIsPlaying(true),
            onPause: () => setIsPlaying(false),
          })
        )
      ),
      React.createElement(
        Modal.Footer,
        { className: 'bg-dark' },
        React.createElement(
          Button,
          { variant: 'secondary', onClick: handleCloseModal },
          'Close'
        )
      )
    )
  );
}

export default Card;
