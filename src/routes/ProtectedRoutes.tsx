import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoutes = () => {
  const { user, isUserLoading, token } = useAuth()
  const location = useLocation()

  if (!token && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  if (isUserLoading) return

  return <Outlet />
  // token ? (
  // <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // )
}

export default ProtectedRoutes
