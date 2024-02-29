import React from 'react'
import * as Chakra from '@chakra-ui/react'
import useAxiosInterceptor from '../hooks/useAxiosInterceptor'
import RegisterForm from '../components/RegisterForm'
import { NavLink } from 'react-router-dom'

interface RegistrationValues {
  username: string
  email: string
  password: string
}

interface RegistrationResponse {
  title: string
  message: string
}

const Register = () => {
  const [regisrationResponse, setRegisrationResponse] =
    React.useState<RegistrationResponse | null>(null)
  const [registrationError, setRegistrationError] = React.useState(null)
  const axios = useAxiosInterceptor()

  const handleSubmit = async (values: RegistrationValues) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/register`,
        {
          ...values,
        }
      )
      setRegisrationResponse(response.data)
    } catch (error: any) {
      setRegistrationError(error.message)
    }
  }

  const handleCloseError = () => {
    setRegistrationError(null)
  }

  return (
    <Chakra.Flex bg="gray.100" align="center" justify="center" h="100vh">
      {regisrationResponse ? (
        <Chakra.Stack w={420}>
          <Chakra.Heading
            as="h1"
            size="xl"
            marginBottom={2}
            textAlign="center"
            color="teal.400"
          >
            {regisrationResponse.title}
          </Chakra.Heading>
          <p className="text-sm text-center">{regisrationResponse.message}</p>
          <Chakra.Button
            as={NavLink}
            to="/login"
            color="gray.500"
            rounded="md"
            colorScheme="purple"
            textColor="white"
            _hover={{
              background: 'purple.600',
            }}
            marginTop={4}
          >
            Go to Login
          </Chakra.Button>
        </Chakra.Stack>
      ) : (
        <RegisterForm
          onSubmit={handleSubmit}
          registrationError={registrationError}
          onCloseError={handleCloseError}
          toLoginLink="/login"
        />
      )}
    </Chakra.Flex>
  )
}

export default Register
