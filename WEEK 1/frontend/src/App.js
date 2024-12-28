import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, CombinedProvider } from './Context';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';

function App() {
    const { token } = useContext(AuthContext);
    return React.createElement(
        Routes,
        null,
        React.createElement(Route, { path: "/signup", element: React.createElement(Signup, null) }),
        React.createElement(Route, { path: "/signin", element: React.createElement(Signin, null) }),
        React.createElement(Route, { 
            path: "/", 
            element: token 
                ? React.createElement(Home, null) 
                : React.createElement(Navigate, { to: "/signup" }) 
        })
    );
}

export default function AppWrapper() {
    return React.createElement(
        CombinedProvider, 
        null,
        React.createElement(App, null)
    );
}

