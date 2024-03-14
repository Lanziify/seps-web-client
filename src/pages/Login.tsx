import * as Chakra from '@chakra-ui/react'
import LoginForm from '../components/LoginForm'

const Login = () => {

  return (
    <Chakra.Flex bg="gray.100" align="center" justify="center" h="100vh">
      <LoginForm/>
    </Chakra.Flex>
  )
}

export default Login
