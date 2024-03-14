// import * as React from 'react'
import * as Chakra from '@chakra-ui/react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Preloader from '../components/Preloader'
import LandingHeader from '../components/LandingHeader'

const PublicRoutes = () => {
  const { user, token, isUserLoading } = useAuth()
  const location = useLocation()

  if (token && user)
    return <Navigate to="/home" state={{ from: location }} replace />

  if (token && isUserLoading) return <Preloader />

  return (
    <Chakra.Stack>
      <LandingHeader />
      <Outlet />
    </Chakra.Stack>
  )
}

export default PublicRoutes
