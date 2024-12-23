import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";

import routes from 'src/routes';

import MainLayout from 'src/layouts/MainLayout';
import AuthLayout from 'src/layouts/AuthLayout';
import Login from 'src/views/Auth/Login';
import Signup from 'src/views/Auth/SignUp';
import Homepage from 'src/views/Home/Homepage';
import ProtectedRoute from 'src/views/ProtectedRoute';
import Unauthorized from 'src/views/Unauthorized';
import UserLayout from 'src/layouts/UserLayout';
import PricingPage from 'src/views/Home/PricingPage';
import NotFound from 'src/views/NotFound';

function App() {
  const user = useSelector((state) => state.user.user);

  const getAdminRoutes = (routes) => {
    return routes
      .filter((prop) => prop.layout === '/admin')
      .map((prop, key) => (
        <Route
          path={prop.path}
          key={key}
          element={React.createElement(prop.component)}
        />
      ));
  };

  const getUserRoutes = (routes) => {
    return routes
      .filter((prop) => prop.layout === '/user')
      .map((prop, key) => (
        <Route
          path={prop.path}
          key={key}
          element={React.createElement(prop.component)}
        />
      ));
  };

  const protectedUser = user?.role == 'admin' || user?.role == 'tenant' ? user.role : ''

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          {/* <Route path="signup" element={<Signup />} /> */}
        </Route>
        <Route
          path="/user/*"
          element={
            <ProtectedRoute requiredRole="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<NotFound />} />
          {getUserRoutes(routes)}
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole={protectedUser}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<NotFound />} />
          {getAdminRoutes(routes)}
        </Route>
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;