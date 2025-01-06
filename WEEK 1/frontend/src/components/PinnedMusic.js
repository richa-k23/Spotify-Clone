import React, { useContext, useEffect } from 'react';
import Card from './Card';
import { MusicContext } from '../Context';

function PinnedMusic() {
  const musicContext = useContext(MusicContext);
  const pinnedMusic = musicContext.pinnedMusic;
  const setPinnedMusic = musicContext.setPinnedMusic;

  useEffect(() => {
    window.scrollTo(0, 0);
    const localPinnedMusic = JSON.parse(localStorage.getItem("pinnedMusic"));
    setPinnedMusic(localPinnedMusic);
  }, [setPinnedMusic]);

  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      { className: 'container' },
      pinnedMusic.length === 0
        ? React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col' },
              React.createElement(
                'h3',
                { className: 'py-5 text-center' },
                "You don't have any pinned music yet!"
              ),
              React.createElement(
                'div',
                { className: 'text-center' },
                React.createElement('i', { className: 'bi bi-emoji-frown fs-1' })
              )
            )
          )
        : React.createElement(
            'div',
            { className: 'row' },
            pinnedMusic.map((element) =>
              React.createElement(Card, { key: element.id, element: element })
            )
          )
    )
  );
}

export default PinnedMusic;
