import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import AuthContextProvider from './context/AuthContext.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthContextProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </AuthContextProvider>
  </Provider>
)
