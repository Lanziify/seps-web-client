import * as Chakra from '@chakra-ui/react'
import lottieNotFound from '../assets/lottieNotFound.json'
import Lottie from 'lottie-react'

const NotFound = () => {
  return (
    <Chakra.Stack
      margin="auto"
      maxWidth="8xl"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      padding={4}
      // backgroundColor="gray.800"
      direction={{ base: 'column', lg: 'row' }}
    >
      <Chakra.Box width={{ base: '40%', lg: '30%' }} flexShrink={0}>
        <Lottie loop autoplay animationData={lottieNotFound} />
      </Chakra.Box>
      <Chakra.Stack textAlign="center" textColor="purple.500">
        <Chakra.Heading as="h1" fontSize="8xl" mb={4}>
          404
        </Chakra.Heading>
        <Chakra.Heading as="h3" fontSize="2xl" mb={4}>
          Oops! The page you're looking for cannot be found.
        </Chakra.Heading>
        <Chakra.Text maxWidth="xl">
          It seems that the page you were trying to reach does not exist or may
          have been moved. Please check the URL and try again. If you believe
          this is an error, please contact the website administrator.
        </Chakra.Text>
      </Chakra.Stack>
    </Chakra.Stack>
  )
}

export default NotFound
