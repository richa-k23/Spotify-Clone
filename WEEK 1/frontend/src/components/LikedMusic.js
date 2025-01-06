import React, { useContext, useEffect } from 'react';
import Card from './Card';
import { MusicContext } from '../Context';

function LikedMusic() {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const setLikedMusic = musicContext.setLikedMusic;

  useEffect(() => {
    window.scrollTo(0, 0);
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic"));
    setLikedMusic(localLikedMusic);
  }, [setLikedMusic]);

  return React.createElement(
    'div',
    null,
    likedMusic.length === 0
      ? React.createElement(
          'div',
          { className: 'container' },
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col' },
              React.createElement(
                'h3',
                { className: 'py-5 text-center' },
                "You don't have any liked music yet!"
              ),
              React.createElement(
                'div',
                { className: 'text-center' },
                React.createElement('i', { className: 'bi bi-emoji-frown fs-1' })
              )
            )
          )
        )
      : React.createElement(
          'div',
          null,
          React.createElement(
            'h1',
            { className: 'text-danger text-center py-3' },
            'Your Liked Music ',
            React.createElement('i', { className: 'bi bi-heart-fill text-danger' })
          )
        ),
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'row' },
        likedMusic.map((element) =>
          React.createElement(Card, { key: element.id, element: element })
        )
      )
    )
  );
}

export default LikedMusic;
