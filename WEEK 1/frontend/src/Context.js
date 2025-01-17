import React, { createContext, useState, useEffect } from "react";  

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem("authToken", newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("authToken");
    };

    useEffect(() => {
        const savedToken = localStorage.getItem("authToken");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    return React.createElement(
        AuthContext.Provider,
        { value: { token, login, logout } },
        children
    );
};

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [likedMusic, setLikedMusic] = useState([]);
    const [pinnedMusic, setPinnedMusic] = useState([]);
    const [resultOffset, setResultOffset] = useState(0);

    return React.createElement(
        MusicContext.Provider,
        { value: { isLoading, setIsLoading, likedMusic, setLikedMusic, resultOffset, setResultOffset, pinnedMusic, setPinnedMusic } },
        children
    );
};

export const CombinedProvider = ({ children }) => {
    return React.createElement(
        AuthProvider,
        null,
        React.createElement(MusicProvider, null, children)
    );
};
