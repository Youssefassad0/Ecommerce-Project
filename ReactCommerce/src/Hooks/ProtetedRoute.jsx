/* eslint-disable react/prop-types */
// components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('auth-user'));

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
