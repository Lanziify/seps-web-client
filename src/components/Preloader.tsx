import * as Chakra from '@chakra-ui/react'
import Lottie from 'lottie-react'
import lottieLoader from '../assets/lottieLoader.json'

const Preloader = () => {
  return (
    <Chakra.Flex
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Lottie
        size={10}
        animationData={lottieLoader}
        loop
        rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
      />
    </Chakra.Flex>
  )
}

export default Preloader
