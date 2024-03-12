import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Preloader from '../components/Preloader'

const PublicRoutes = () => {
  const { user, token, isUserLoading } = useAuth()
  const location = useLocation()

  if (token && user)
    return <Navigate to="/home" state={{ from: location }} replace />

  if (token && isUserLoading) return <Preloader />

  return <Outlet />
}

export default PublicRoutes
