import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from 'src/layouts/MainLayout'
import AuthLayout from 'src/layouts/AuthLayout'
import routes from 'src/routes'
import Login from 'src/views/Auth/Login'
import ProtectedRoute from './views/ProtectedRoute'
import Signup from './views/Auth/SignUp'

function App() {

  const getAdminRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return <Route path={prop.path} key={key} element={<prop.component />} />
      }
    })
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/admin" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          {getAdminRoutes(routes)}
        </Route>
      </Routes>
    </>
  );
}

export default App;