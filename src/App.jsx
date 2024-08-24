import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout';
import AuthLayout from 'src/layouts/AuthLayout';
import routes from 'src/routes';
import Login from 'src/views/Auth/Login';
import Signup from 'src/views/Auth/SignUp';
import Homepage from 'src/views/Home/Homepage';
import ProtectedRoute from 'src/views/ProtectedRoute'; // Import your ProtectedRoute component
import Unauthorized from './views/Unauthorized';
import UserLayout from './layouts/UserLayout';
import PricingPage from './views/Home/PricingPage';

function App() {
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

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route
          path="/user/*"
          element={
            <ProtectedRoute requiredRole="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          {getUserRoutes(routes)}
        </Route>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {getAdminRoutes(routes)}
        </Route>
      </Routes>
    </>
  );
}

export default App;