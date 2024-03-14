import * as Chakra from '@chakra-ui/react'
import RegisterForm from '../components/RegisterForm'

const Register = () => {
  return (
    <Chakra.Flex bg="gray.100" align="center" justify="center" h="100vh">
      <RegisterForm />
    </Chakra.Flex>
  )
}

export default Register
