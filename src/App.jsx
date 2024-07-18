import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from 'src/layouts/MainLayout'
import AuthLayout from 'src/layouts/AuthLayout'
import routes from 'src/routes'
import Login from 'src/views/Auth/Login'

export default function App() {

  const getAdminRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return <Route path={prop.path} key={key} element={<prop.component />} />
      }
    })
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/admin" element={<MainLayout />}>
          {getAdminRoutes(routes)}
        </Route>
      </Routes>
    </div>
  )
}