import React from 'react'
import axios from '../api/axios'

type AuthProviderProps = {
  children: React.ReactNode
}

type Token = { accessToken: string; refreshToken: string | undefined } | null

const Context = React.createContext<{
  token: Token
  user: any | null
  saveToken: (token: Token) => Promise<void>
  logoutUser: () => void
}>({
  token: null,
  user: null,
  saveToken: async () => {},
  logoutUser: () => {},
})

const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState(null)

  const getToken = (): Token => {
    const userToken = localStorage.getItem('accessToken')
    return userToken ? JSON.parse(userToken) : null
  }

  const [token, setToken] = React.useState<Token>(getToken())

  const logoutUser = () => {
    localStorage.removeItem('accessToken')
    setToken(null)
    setUser(null)
  }

  const saveToken = async (token: Token) => {
    localStorage.setItem('accessToken', JSON.stringify(token))
    setToken(token)
  }

  React.useEffect(() => {
    const getUserDetails = async () => {
      try {
        if (!token) return
        const response = await axios.get('/user/details')
        setUser(response.data.user)
      } catch (error) {
        console.log(error)
      }
    }
    getUserDetails()
  }, [token])

  const values = {
    user,
    token,
    saveToken,
    logoutUser,
  }

  return <Context.Provider value={values}>{children}</Context.Provider>
}

export default AuthContextProvider

export const useAuth = () => React.useContext(Context)
