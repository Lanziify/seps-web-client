import axios, { AxiosInstance } from 'axios'

export default axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
})

export const customAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
