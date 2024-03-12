import axios from 'axios'

import { useAuth } from '../context/AuthContext'

const useRefreshToken = () => {
  const { user, saveToken } = useAuth()

  const getAccessToken = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}/${user.user_id}/refresh_token`
    )

    await saveToken(response.data.accessToken)
    return response.data.accessToken
  }

  return getAccessToken
}

export default useRefreshToken
