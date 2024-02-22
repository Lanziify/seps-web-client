// import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user, logoutUser } = useAuth()
  return (
    <Chakra.Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Chakra.Box bg="white" rounded="md" margin={8}>
        <Chakra.Stack padding={3} spacing={3}>
          <Chakra.Heading as="h1" size="2xl">
            Hello,  {user.username}!
          </Chakra.Heading>
          <Chakra.Button colorScheme="red" onClick={logoutUser}>
            Logout
          </Chakra.Button>
        </Chakra.Stack>
      </Chakra.Box>
    </Chakra.Flex>
  )
}

export default Home
