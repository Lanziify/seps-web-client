import React from 'react'
import * as Chakra from '@chakra-ui/react'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../context/AuthContext'

interface LoginValues {
  email: string
  password: string
}

const Login = () => {
  const { loginUser } = useAuth()
  const [loginError, setLoginError] = React.useState(null)

  const handleSubmit = async (values: LoginValues) => {
    try {
       await loginUser(values)
    } catch (error: any) {
      setLoginError(error.message)
    }
  }

  const handleCloseError = () => {
    setLoginError(null)
  }

  return (
    <Chakra.Flex bg="gray.100" align="center" justify="center" h="100vh">
      <LoginForm
        onSubmit={handleSubmit}
        loginError={loginError}
        onCloseError={handleCloseError}
        toRegistrationLink="/register"
      />
    </Chakra.Flex>
  )
}

export default Login
