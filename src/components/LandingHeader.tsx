import * as React from 'react'
import * as Chakra from '@chakra-ui/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useModal } from '../context/ModalContext'
import { defaultFade, itemSlideDown } from '../animations/animations'

const LandingHeader = () => {
  const { scrollYProgress } = useScroll()
  const { onOpen, mountModalContent: onModalContent } = useModal()

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
    onOpen()
    if (buttonId === 'login') {
      onModalContent(<LoginForm />)
    } else {
      onModalContent(<RegisterForm />)
    }
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
        gap={3}
      >
        <Chakra.Flex alignItems="center" gap={4} flexShrink={0}>
          <Chakra.Text
            as={motion.h1}
            initial="initial"
            animate="animate"
            variants={itemSlideDown}
            fontSize={24}
            fontWeight={900}
            color="purple.500"
            zIndex={10}
            padding={4}
          >
            SEPS
          </Chakra.Text>
        </Chakra.Flex>

        <Chakra.Flex
          as={motion.div}
          initial="initial"
          animate="animate"
          variants={defaultFade}
          gap={4}
          padding={3}
          overflow="hidden"
        >
          {headerLinks.map((link, index) => (
            <Chakra.Button
              as={motion.button}
              variants={itemSlideDown}
              key={index}
              // as={NavLink}
              // to={link.path}
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
            as={motion.button}
            variants={itemSlideDown}
            id="register"
            variant="ghost"
            onClick={handleButtonClick}
          >
            Register
          </Chakra.Button>
          <Chakra.Button
            as={motion.button}
            variants={itemSlideDown}
            id="login"
            variant="solid"
            colorScheme="purple"
            onClick={handleButtonClick}
          >
            Login
          </Chakra.Button>
        </Chakra.Flex>
      </Chakra.Flex>
    </Chakra.Stack>
  )
}

export default LandingHeader
