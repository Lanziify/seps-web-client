import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import AuthContextProvider from './context/AuthContext.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.tsx'
import ModalContextProvider from './context/ModalContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ChakraProvider>
      <AuthContextProvider>
        <ModalContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </ModalContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </Provider>
)
