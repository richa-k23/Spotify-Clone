import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './Context.jsx';
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx';
import Home from './components/Home.jsx';

function App() {
    const { token } = useContext(AuthContext);
    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route
            path="/"
            element={token ? <Home /> : <Navigate to="/signup" />}
            />
        </Routes>
    );
}

export default function AppWrapper() {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
}
