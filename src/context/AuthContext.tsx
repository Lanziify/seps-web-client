import React from 'react'
import axios from 'axios'

const Context = React.createContext(null)

type AuthProviderProps = {
  children: React.ReactNode
}

type UserData = {
  username: string
  email: string
  password: string
}

const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState(null)

  const loginUser: any = async (data: UserData) => {
    try {
      const result = await axios(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/login`,
        {
          method: 'POST',
          data: { data },
        }
      )
      setUser(result.data)
    } catch (error) {
      console.log(error)
    }
  }


  const values: any = { user, loginUser }

  return <Context.Provider value={values}>{children}</Context.Provider>
}

export default AuthContextProvider

export const useAuth = () => React.useContext(Context)
