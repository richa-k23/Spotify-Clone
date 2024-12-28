import React, { useContext, useEffect, useState, useRef } from 'react';
import { MusicContext } from '../Context';
import Navbar from './Navbar';
import './Home.css';

function Home() {
    const [keyword, setKeyword] = useState('');
    const [message, setMessage] = useState('');
    const [tracks, setTracks] = useState([]);
    const [token, setToken] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());

    const { isLoading, setIsLoading, resultOffset, setResultOffset } = useContext(MusicContext);

    const fetchMusicData = async (query = '', offset = 0) => {
        if (!token) {
            console.error('No token available');
            return;
        }

        setTracks([]);
        setMessage('');
        window.scrollTo(0, 0);
        setIsLoading(true);

        try {
            const searchQuery = query || keyword;
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&offset=${offset}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch music data: ${response.statusText}`);
            }

            const jsonData = await response.json();
            console.log('Fetched data:', jsonData);
            jsonData.tracks.items.forEach(track => {
                if (track.preview_url) {
                    console.log(`Preview URL for ${track.name}: ${track.preview_url}`);
                } else {
                    console.log('Track details:', track);
                    console.log(`No preview URL for ${track.name}`);
                }
            });
            
            setTracks(jsonData.tracks.items.slice(0, 10));
            setHasSearched(true);
        } catch (error) {
            setMessage("We couldn't retrieve the music data. Please try again.");
            console.error('Error fetching music data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setResultOffset(0);
            fetchMusicData(keyword, 0);
        }
    };

    const handleSearchClick = () => {
        setResultOffset(0);
        fetchMusicData(keyword, 0);
    };

    useEffect(() => {
        const fetchToken = async () => {
            try {
                setIsLoading(true);

                const response = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body:
                        'grant_type=client_credentials&client_id=b7a8529c921d4cf89e5c26f620d64899&client_secret=f5b9dc475d5248da937ccd8238200f59',
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch token: ${response.statusText}`);
                }

                const jsonData = await response.json();
                setToken(jsonData.access_token);
                console.log('Token fetched:', jsonData.access_token);
            } catch (error) {
                setMessage("We couldn't retrieve the token. Please try again.");
                console.error('Error fetching token:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchToken();
    }, [setIsLoading]);

    const playSong = (track) => {
        if (currentTrack && currentTrack.id === track.id && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.src = track.preview_url || '';
            audioRef.current.load();
            audioRef.current.play();
            setCurrentTrack(track);
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        return () => {
            audioRef.current.pause();
        };
    }, []);

    return React.createElement(
        'div',
        null,
        React.createElement(Navbar, {
            keyword: keyword,
            setKeyword: setKeyword,
            handleKeyPress: handleKeyPress,
            fetchMusicData: handleSearchClick,
        }),
        React.createElement(
            'div',
            { className: 'container' },
            isLoading &&
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-12 py-5 text-center' },
                        React.createElement(
                            'div',
                            { className: 'spinner-border', style: { width: '3rem', height: '3rem' }, role: 'status' },
                            React.createElement('span', { className: 'visually-hidden' }, 'Loading...')
                        )
                    )
                ),

            message &&
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-12 py-2 text-center' },
                        React.createElement('h4', { className: 'text-center text-danger' }, message)
                    )
                ),

            hasSearched && tracks.length > 0
                ? tracks.map((track) =>
                      React.createElement(
                          'div',
                          { key: track.id, className: 'col-12 mb-3' },
                          React.createElement(
                              'div',
                              { className: 'track-info p-3 border rounded' },
                              React.createElement('h5', null, track.name),
                              React.createElement('p', null, track.artists[0].name),
                              React.createElement(
                                  'button',
                                  {
                                      onClick: () => playSong(track),
                                      className: 'btn btn-primary mt-2',
                                  },
                                  currentTrack && currentTrack.id === track.id && isPlaying ? 'Pause' : 'Play'
                              )
                          )
                      )
                  )
                : !hasSearched &&
                  React.createElement(
                      'div',
                      { className: 'col-12 py-5 text-center' },
                      React.createElement('h3', { className: 'animated-text py-5' }, 'Please search for your favourite song'),
                      React.createElement('br'),
                      React.createElement('img', {
                          src: 'https://images.pexels.com/photos/934067/pexels-photo-934067.jpeg',
                          alt: 'Lyric Notes Image',
                          className: 'img-fluid artistic-img',
                      })
                  ),

            hasSearched && tracks.length > 0 &&
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col' },
                        React.createElement(
                            'button',
                            {
                                onClick: () => {
                                    setResultOffset((previous) => Math.max(previous - 20, 0));
                                    fetchMusicData(keyword, resultOffset - 20);
                                },
                                className: 'btn btn-outline-success w-100',
                                disabled: resultOffset === 0,
                            },
                            `Previous Page: ${resultOffset / 20}`
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col' },
                        React.createElement(
                            'button',
                            {
                                onClick: () => {
                                    setResultOffset((previous) => previous + 20);
                                    fetchMusicData(keyword, resultOffset + 20);
                                },
                                className: 'btn btn-outline-success w-100',
                            },
                            `Next Page: ${resultOffset / 20 + 2}`
                        )
                    )
                )
        )
    );
}

export default Home;
