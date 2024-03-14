import * as React from 'react'
import * as Chakra from '@chakra-ui/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

interface ModalFormContent {
  id: string | null
  content: JSX.Element | null
}

const LandingHeader = () => {
  const { scrollYProgress } = useScroll()
  const { isOpen, onOpen, onClose } = Chakra.useDisclosure()
  const [modalFormContent, setModalFormContent] =
    React.useState<ModalFormContent>({
      id: '',
      content: null,
    })

  const headerLinks = [
    {
      name: 'Home',
      path: '',
    },
    {
      name: 'About',
      path: '',
    },
    {
      name: 'Institutions',
      path: '',
    },
  ]

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.1],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.75)']
  )

  const handleButtonClick = (event: React.MouseEvent) => {
    const buttonId = (event?.target as HTMLElement).id
    setModalFormContent(() => {
      if (buttonId === 'login') {
        return {
          id: buttonId,
          content: <LoginForm />,
        }
      } else {
        return {
          id: buttonId,
          content: <RegisterForm />,
        }
      }
    })
    onOpen()
  }

  return (
    <Chakra.Stack position="sticky" top={0} zIndex={10}>
      <motion.div
        style={{
          background: backgroundOpacity,
        }}
        className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur-md  z-0"
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 border-b z-1"
        style={{ opacity: opacity }}
      />
      <Chakra.Flex
        as="header"
        width="100%"
        maxWidth="8xl"
        margin="auto"
        justifyContent="space-between"
        alignItems="center"
        padding={3}
        gap={3}
      >
        <Chakra.Flex alignItems="center" gap={4} flexShrink={0}>
          <Chakra.Text
            as="h1"
            fontSize={24}
            fontWeight={900}
            color="purple.500"
            zIndex={10}
          >
            SEPS
          </Chakra.Text>
        </Chakra.Flex>

        <Chakra.Flex gap={4}>
          {headerLinks.map((link, index) => (
            <Chakra.Button
              key={index}
              as={NavLink}
              to={link.path}
              _hover={{
                backgroundColor: 'transparent',
                textColor: 'purple.500',
              }}
              background="transparent"
              hideBelow="md"
            >
              {link.name}
            </Chakra.Button>
          ))}
          <Chakra.Button
            id="register"
            variant="ghost"
            onClick={handleButtonClick}
          >
            Register
          </Chakra.Button>
          <Chakra.Button
            id="login"
            variant="solid"
            colorScheme="purple"
            onClick={handleButtonClick}
          >
            Login
          </Chakra.Button>
        </Chakra.Flex>
      </Chakra.Flex>

      <Chakra.Modal onClose={onClose} isOpen={isOpen} isCentered>
        <Chakra.ModalOverlay bg="blackAlpha.500" />
        <Chakra.ModalContent
          backgroundColor="#fff"
          rounded="xl"
          backdropFilter="auto"
          backdropBlur="2xl"
          maxW="lg"
          margin={4}
          shadow="2xl"
        >
          <Chakra.ModalCloseButton
            onClick={() => setModalFormContent({ id: null, content: null })}
          />
          {modalFormContent.content}
        </Chakra.ModalContent>
      </Chakra.Modal>
    </Chakra.Stack>
  )
}

export default LandingHeader
