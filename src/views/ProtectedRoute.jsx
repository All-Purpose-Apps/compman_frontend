import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    // Get the user state from the Redux store
    const user = useSelector((state) => state.user.user);

    // If the user is not authenticated, redirect to the login page
    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    // If the user is authenticated, render the children components
    return children;
}