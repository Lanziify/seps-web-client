import React from 'react'
import useAxiosInterceptor from '../hooks/useAxiosInterceptor'
import { IUserMetadata } from '../types/IUserMetadata'

type AuthProviderProps = {
  children: React.ReactNode
}

interface LoginValues {
  email: string
  password: string
}

const Context = React.createContext<{
  token: string | null
  user: any | null
  isUserLoading: boolean
  loginUser: (values: LoginValues) => Promise<void>
  saveToken: (token: string) => Promise<void>
  logoutUser: () => Promise<void>
}>({
  token: null,
  user: null,
  isUserLoading: true,
  loginUser: async () => {},
  saveToken: async () => {},
  logoutUser: async () => {},
})

const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<IUserMetadata | null>(null)
  const [isUserLoading, setIsUserLoading] = React.useState(true)
  const axios = useAxiosInterceptor()

  const getToken = () => {
    const userToken = localStorage.getItem('accessToken')
    return userToken ? userToken : null
  }

  const [token, setToken] = React.useState(getToken())

  const loginUser = async (values: LoginValues) => {
    try {
      const response = await axios.post('/login', {
        ...values,
      })
      saveToken(response.data.accessToken)
      saveUser(response.data.user)
      setIsUserLoading(false)
    } catch (error) {
      setIsUserLoading(false)
      throw error
    }
  }

  const logoutUser = async () => {
    try {
      setIsUserLoading(true)
      await axios.delete('/logout')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userData')
      setToken(null)
      setUser(null)
      setIsUserLoading(false)
    } catch (error) {
      setIsUserLoading(false)
      throw error
    }
  }

  const saveToken = async (token: string) => {
    localStorage.setItem('accessToken', token)
    setToken(token)
  }

  const saveUser = async (user: IUserMetadata) => {
    localStorage.setItem('userData', JSON.stringify(user))
    setUser(user)
  }

  React.useEffect(() => {
    const loadUserData = async () => {
      try {
        if (token) {
          setIsUserLoading(true)
          // const response = await axios.get('/user', {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // })
          // setUser(response.data)

          const userData = localStorage.getItem('userData')
          if (userData) {
            setUser(JSON.parse(userData))
          }

          setIsUserLoading(false)
        }
      } catch (error) {
        localStorage.removeItem('accessToken')
        setUser(null)
        setToken(null)
        setIsUserLoading(false)
      }
    }

    loadUserData()
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
