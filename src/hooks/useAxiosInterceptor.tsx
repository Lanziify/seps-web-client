import customAxios from '../api/axios'
import React from 'react'
import { useAuth } from '../context/AuthContext'
import useRefreshToken from './useRefreshToken'
import { AxiosError, isAxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'

interface ErrorResponse {
  error: string
}

const useAxiosInterceptor = () => {
  const { token } = useAuth()
  const refresh = useRefreshToken()

  const isTokenExpired = (token: { accessToken: string }) => {
    const decodedToken: any = jwtDecode(token.accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp < currentTime
  }

  React.useEffect(() => {
    const requestInterceptor = customAxios.interceptors.request.use(
      async (config) => {
        if (token) {
          if (!isTokenExpired(token)) {
            config.headers['Authorization'] = `Bearer ${token.accessToken}`
          } else {
            const newAccessToken = await refresh()
            config.headers['Authorization'] = `Bearer ${newAccessToken}`
          }
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    const responseInterceptor = customAxios.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>
          if (axiosError.response?.data) {
            throw axiosError.response.data
          }
        }
        return Promise.reject(error)
      }
    )

    return () => {
      customAxios.interceptors.request.eject(requestInterceptor)
      customAxios.interceptors.response.eject(responseInterceptor)
    }
  }, [token, refresh])

  return customAxios
}
export default useAxiosInterceptor
