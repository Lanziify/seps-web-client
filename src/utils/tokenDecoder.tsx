import { jwtDecode } from 'jwt-decode'

export const decodeUserIntoken = (token: any) => {
  const decodedToken = jwtDecode(token.accessToken)
  return { ...decodedToken }
}
