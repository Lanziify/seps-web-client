import React from 'react'

type Token = string | null

type UseTokenHook = {
  token: Token
  saveToken: (token: string) => Promise<void>
  removeToken: () => void
}

const useToken = (): UseTokenHook => {
  const getToken = (): Token => {
    const userToken = localStorage.getItem('accessToken')
    return userToken ? JSON.parse(userToken) : null
  }

  const [token, setToken] = React.useState<Token>(getToken())

  const saveToken = async (token: string) => {
    localStorage.setItem('accessToken', JSON.stringify(token))
    setToken(token)
  }

  const removeToken = () => {
    localStorage.removeItem('accessToken')
    setToken(null)
  }

  return {
    token,
    saveToken,
    removeToken,
  }
}

export default useToken
