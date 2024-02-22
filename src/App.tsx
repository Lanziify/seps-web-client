import { Route, Routes } from 'react-router-dom'
import './App.css'
import PublicRoutes from './routes/PublicRoutes'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { useAuth } from './context/AuthContext'

function App() {
  const {getUserDetails} = useAuth()
  return (
    <Routes>
      <Route path="/" element={<PublicRoutes />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        {/* <Route index element={<Home />} /> */}
        <Route path="home" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
