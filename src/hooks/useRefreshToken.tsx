import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const useRefreshToken = () => {
  const { token, saveToken } = useAuth()

  const getAccessToken = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/refresh_token`,
      {
        refresh: `Bearer ${token?.refreshToken}`,
      }
    )

    //   console.log(response.data.accessToken)
    //   updateToken(response.data.accessToken)
    saveToken({
      accessToken: response.data.accessToken,
      refreshToken: token?.refreshToken,
    })
    return response.data.accessToken
  }

  return getAccessToken
}

export default useRefreshToken
