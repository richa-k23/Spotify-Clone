import React, { useContext, useState } from 'react';
import { MusicContext } from '../Context';

function CreatePlaylist({ track }) {
  const { likedMusic, setLikedMusic } = useContext(MusicContext);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [message, setMessage] = useState('');
  
  // Handler to create a new playlist
  const createNewPlaylist = () => {
    if (!newPlaylistName) {
      setMessage('Please enter a playlist name.');
      return;
    }

    const newPlaylist = {
      name: newPlaylistName,
      tracks: [track], // Add the current track to the new playlist
    };

    setLikedMusic((prevMusic) => {
      const updatedMusic = [...prevMusic, newPlaylist];
      localStorage.setItem('likedMusic', JSON.stringify(updatedMusic));
      return updatedMusic;
    });

    setMessage(`Playlist "${newPlaylistName}" created successfully!`);
    setShowCreateForm(false);
  };

  // Handler to add song to an existing playlist
  const addSongToPlaylist = (playlist) => {
    playlist.tracks.push(track);

    setLikedMusic((prevMusic) => {
      const updatedMusic = prevMusic.map((pl) =>
        pl.name === playlist.name ? playlist : pl
      );
      localStorage.setItem('likedMusic', JSON.stringify(updatedMusic));
      return updatedMusic;
    });

    setMessage(`Song added to "${playlist.name}"`);
  };

  return React.createElement(
    'div',
    null,
    React.createElement(
      'h2',
      null,
      'Add song to Playlist'
    ),
    likedMusic.length === 0
      ? React.createElement(
          'div',
          { className: 'text-center' },
          React.createElement(
            'h4',
            null,
            'Make a playlist to add your favourite songs'
          ),
          React.createElement(
            'button',
            {
              className: 'btn btn-primary mt-3',
              onClick: () => setShowCreateForm(true)
            },
            'Create New Playlist'
          )
        )
      : React.createElement(
          'div',
          null,
          React.createElement(
            'h4',
            null,
            'Select a Playlist:'
          ),
          React.createElement(
            'ul',
            null,
            likedMusic.map((playlist, index) =>
              React.createElement(
                'li',
                { key: index },
                React.createElement(
                  'button',
                  {
                    className: 'btn btn-outline-success',
                    onClick: () => addSongToPlaylist(playlist)
                  },
                  playlist.name
                )
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'text-center mt-3' },
            React.createElement(
              'button',
              {
                className: 'btn btn-primary',
                onClick: () => setShowCreateForm(true)
              },
              'Create New Playlist'
            )
          )
        ),
    showCreateForm &&
      React.createElement(
        'div',
        { className: 'mt-3' },
        React.createElement(
          'h4',
          null,
          'Create New Playlist'
        ),
        React.createElement('input', {
          type: 'text',
          value: newPlaylistName,
          onChange: (e) => setNewPlaylistName(e.target.value),
          placeholder: 'Enter Playlist Name',
          className: 'form-control'
        }),
        React.createElement(
          'button',
          {
            className: 'btn btn-success mt-3',
            onClick: createNewPlaylist
          },
          'Create Playlist'
        ),
        React.createElement(
          'button',
          {
            className: 'btn btn-danger mt-3 ml-2',
            onClick: () => setShowCreateForm(false)
          },
          'Cancel'
        )
      ),
    message &&
      React.createElement(
        'div',
        { className: 'text-center mt-3 text-success' },
        message
      )
  );
}

export default CreatePlaylist;
