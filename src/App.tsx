import { Route, Routes } from 'react-router-dom'
import './App.css'
import PublicRoutes from './routes/PublicRoutes'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Predictions from './pages/Predictions'
import Datasets from './pages/Datasets'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoutes />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="home" element={<Home />} />
        <Route path="predictions" element={<Predictions />} />
        <Route path="datasets" element={<Datasets />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
