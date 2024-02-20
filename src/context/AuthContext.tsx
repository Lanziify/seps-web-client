import React from 'react'
import axios from 'axios'
import useToken from '../hooks/useToken'

const BASE_URL = `${import.meta.env.VITE_REACT_APP_BASE_URL}`

const Context = React.createContext<{
  user: any | null
  loginUser: (values: UserData) => Promise<void>
  clearToken: () => void
}>({
  user: {},
  loginUser: async () => {},
  clearToken: () => {},
})

type AuthProviderProps = {
  children: React.ReactNode
}

type UserData = {
  email: string
  password: string
}

const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState(null)
  const { token, saveToken, removeToken } = useToken()

  const loginUser = async (values: UserData) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        ...values,
      })
      saveToken(response.data.accessToken)
    } catch (error) {
      throw error
    }
  }

  const getUserDetails = async () => {
    try {
      if (token == null) return
      const response = await axios.get(`${BASE_URL}/user/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUser(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getUserDetails()
  }, [token])

  const clearToken = () => {
    removeToken()
  }

  const values = { user, token, loginUser, clearToken }

  return <Context.Provider value={values}>{children}</Context.Provider>
}

export default AuthContextProvider

export const useAuth = () => React.useContext(Context)
