import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import CreatePlaylist from './CreatePlaylist';
import { initializePlaylist } from '../initialize';
import { MusicContext } from '../Context';
import Navbar from './Navbar';
import './Home.css';

function Home() {
    const [keyword, setKeyword] = useState('');
    const [message, setMessage] = useState('');
    const [tracks, setTracks] = useState([]);
    const [token, setToken] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const {
        isLoading,
        setIsLoading,
        setLikedMusic,
        setPinnedMusic,
        resultOffset,
        setResultOffset
    } = useContext(MusicContext);

    const fetchMusicData = async (query = '', offset = 0) => {
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

            jsonData.tracks.items.forEach((track) => {
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
        initializePlaylist();

        const fetchToken = async () => {
            try {
                setIsLoading(true);

                const response = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        grant_type: 'client_credentials',
                        client_id: 'b7a8529c921d4cf89e5c26f620d64899',
                        client_secret: '7537626cf9ca4a53808f9d5f20cb4436',
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch token: ${response.statusText}`);
                }

                const jsonData = await response.json();
                setToken(jsonData.access_token);

                fetchMusicData('genre:indian');
                console.log('Token fetched:', jsonData.access_token);
            } catch (error) {
                setMessage("We couldn't retrieve the token. Please try again.");
                console.error('Error fetching token:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchToken();
        setLikedMusic(JSON.parse(localStorage.getItem('likedMusic')) || []);
        setPinnedMusic(JSON.parse(localStorage.getItem('pinnedMusic')) || []);
    }, [setIsLoading, setLikedMusic, setPinnedMusic]);

    useEffect(() => {
        if (token && !hasSearched) {
            fetchMusicData('genre:indian');
            setHasSearched(true);
        }
    }, [token, hasSearched]);

    const playSong = (track) => {
        console.log(`Playing song: ${track.name}`);
    };

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

            React.createElement(
                'div',
                { className: 'row' },
                tracks.length > 0
                    ? tracks.map((element) =>
                          React.createElement(
                              Card,
                              { key: element.id, element: element },
                              React.createElement(
                                  'button',
                                  {
                                      onClick: () => playSong(element),
                                      className: 'btn btn-primary mt-2',
                                  },
                                  'Play'
                              )
                          )
                      )
                    : React.createElement(
                          'div',
                          { className: 'col-12 text-center' },
                          React.createElement('p', null, 'No tracks available. Please perform a search.')
                      )
            ),

            hasSearched &&
                tracks.length > 0 &&
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
        ),
        React.createElement(
            'div',
            { className: 'modal fade position-absolute', id: 'exampleModal', tabIndex: '-1', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true' },
            React.createElement(
                'div',
                null,
                React.createElement(CreatePlaylist, null)
            )
        )
    );
}

export default Home;
