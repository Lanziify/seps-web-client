import React from 'react'
import axios from '../api/axios'
import { decodeUserIntoken } from '../utils/tokenDecoder'

type AuthProviderProps = {
  children: React.ReactNode
}

interface LoginValues {
  email: string
  password: string
}

type Token = { accessToken: string; refreshToken: string | undefined } | null

const Context = React.createContext<{
  token: Token
  user: any | null
  isUserLoading: boolean
  loginUser: (values: LoginValues) => Promise<void>
  saveToken: (token: Token) => Promise<void>
  logoutUser: () => void
}>({
  token: null,
  user: null,
  isUserLoading: true,
  loginUser: async () => {},
  saveToken: async () => {},
  logoutUser: () => {},
})

const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState(null)
  const [isUserLoading, setIsUserLoading] = React.useState(true)

  const getToken = (): Token => {
    const userToken = localStorage.getItem('accessToken')
    return userToken ? JSON.parse(userToken) : null
  }

  const [token, setToken] = React.useState<Token>(getToken())

  const loginUser = async (values: LoginValues) => {
    try {
      setIsUserLoading(true)
      const response = await axios.post('/login', {
        ...values,
      })
      const userData: any = decodeUserIntoken(response.data)
      saveToken(response.data)
      setUser(userData)
      setIsUserLoading(false)
    } catch (error) {
      throw error
    }
  }

  const logoutUser = () => {
    setIsUserLoading(true)
    localStorage.removeItem('accessToken')
    setToken(null)
    setUser(null)
    setIsUserLoading(false)
  }

  const saveToken = async (token: Token) => {
    localStorage.setItem('accessToken', JSON.stringify(token))
    setToken(token)
  }

  React.useEffect(() => {
    if (token) {
      setIsUserLoading(true)
      const userData: any = decodeUserIntoken(token)
      setUser(userData)
      setIsUserLoading(false)
    }
  }, [token])

  const values = {
    user,
    token,
    isUserLoading,
    saveToken,
    loginUser,
    logoutUser,
  }

  return <Context.Provider value={values}>{children}</Context.Provider>
}

export default AuthContextProvider

export const useAuth = () => React.useContext(Context)
