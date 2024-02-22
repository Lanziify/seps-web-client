import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PublicRoutes = () => {
  const { user, token } = useAuth()
  const location = useLocation()

  if (token && user) return <Navigate to="/home" state={{ from: location }} replace />

  return <Outlet />
}

export default PublicRoutes
