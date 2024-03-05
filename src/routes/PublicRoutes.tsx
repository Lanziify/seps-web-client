import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PublicRoutes = () => {
  const { user, token, isUserLoading } = useAuth()
  const location = useLocation()

  
  if (token && user) return <Navigate to="/home" state={{ from: location }} replace />
  
  if (token && isUserLoading) return
  
  return <Outlet />
}

export default PublicRoutes
