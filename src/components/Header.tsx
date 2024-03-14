import * as React from 'react'
import * as Chakra from '@chakra-ui/react'
import {
  IoFileTray,
  IoMenuOutline,
  IoPerson,
  IoSearchOutline,
  IoSettings,
} from 'react-icons/io5'
import { useAuth } from '../context/AuthContext'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import AssessmentForm from './AssessmentForm'
import { HeaderProps } from '../types/HeaderProps'

const Header = (props: HeaderProps) => {
  const { scrollYProgress } = useScroll()
  const location = useLocation()
  const { isOpen, onOpen, onClose } = Chakra.useDisclosure()
  const initialFocusRef = React.useRef(null)
  const { user, logoutUser } = useAuth()

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.1],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.75)']
  )

  const handleEvaluationClick = () => {
    if (location.pathname.slice(1) === 'home') return
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
        className="absolute bottom-0 left-0 right-0 border-b z-20"
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
          <Chakra.IconButton
            aria-label="profile"
            size="sm"
            rounded="full"
            icon={<IoMenuOutline size={24} />}
            color="purple.400"
            onClick={props.toggleMenu}
            hideBelow='md'
          />
          <Chakra.Text
            as="h1"
            fontSize={14}
            fontWeight={900}
            
            color="purple.500"
            zIndex={10}
          >
            Student Employability Prediction
          </Chakra.Text>
        </Chakra.Flex>
        <Chakra.InputGroup width="100%" size='sm' maxWidth="2xl" hideBelow="md">
          <Chakra.Input variant="filled" rounded='lg' placeholder="Search" />
          <Chakra.InputLeftElement>
            <IoSearchOutline size={18} />
          </Chakra.InputLeftElement>
        </Chakra.InputGroup>
        <Chakra.Stack direction="row" hideBelow="sm">
          <Chakra.Button
            colorScheme={
              location.pathname.slice(1) === 'home' ? 'gray' : 'purple'
            }
            size="sm"
            hideBelow="md"
            onClick={handleEvaluationClick}
          >
            Evaluate Student
          </Chakra.Button>
          <Chakra.IconButton
            aria-label="profile"
            size="sm"
            background="transparent"
            icon={<IoFileTray size={24} />}
            color="gray.400"
          />
          <Chakra.IconButton
            aria-label="profile"
            size="sm"
            background="transparent"
            icon={<IoSettings size={24} />}
            color="gray.400"
          />
          <Chakra.IconButton
            aria-label="profile"
            size="sm"
            background="purple.400"
            icon={<IoPerson size={24} />}
            color="white"
            hideFrom="md"
          />
          <Chakra.Popover
            initialFocusRef={initialFocusRef}
            placement="bottom-end"
            closeOnBlur={false}
          >
            <Chakra.PopoverTrigger>
              <Chakra.IconButton
                aria-label="profile"
                background="purple.400"
                size="sm"
                icon={
                  <Chakra.Avatar size="sm" name={user.username}>
                    <Chakra.AvatarBadge boxSize="1.25em" bg="green.500" />
                  </Chakra.Avatar>
                }
                color="white"
                isRound
              />
            </Chakra.PopoverTrigger>
            <Chakra.Portal>
              <Chakra.PopoverContent>
                <Chakra.PopoverHeader as="h1" fontSize="2xl" fontWeight="bold">
                  Profile
                </Chakra.PopoverHeader>
                <Chakra.PopoverArrow bg="white" />
                <Chakra.PopoverCloseButton />
                <Chakra.PopoverBody>
                  <Chakra.Flex gap={4} alignItems="center" height={100}>
                    <Chakra.Avatar
                      size="lg"
                      name={user.username}
                    ></Chakra.Avatar>
                    <Chakra.Stack spacing={0}>
                      <Chakra.Text fontSize="xl" fontWeight={700}>
                        {user.username}
                      </Chakra.Text>
                      <Chakra.Stack spacing={0}>
                        <Chakra.Text fontSize={14}>{user.email}</Chakra.Text>
                        <Chakra.Badge
                          variant="outline"
                          colorScheme="purple"
                          width="fit-content"
                          fontSize={10}
                        >
                          {user.verified ? 'Verified' : ''}
                        </Chakra.Badge>
                      </Chakra.Stack>
                    </Chakra.Stack>
                  </Chakra.Flex>
                </Chakra.PopoverBody>
                <Chakra.PopoverFooter>
                  <Chakra.Button size="sm" width="100%" onClick={logoutUser}>
                    Logout
                  </Chakra.Button>
                </Chakra.PopoverFooter>
              </Chakra.PopoverContent>
            </Chakra.Portal>
          </Chakra.Popover>
        </Chakra.Stack>
        <Chakra.IconButton
          aria-label="profile"
          size="sm"
          background="purple.400"
          icon={<IoMenuOutline size={18} />}
          color="white"
          hideFrom="sm"
        />
      </Chakra.Flex>

      <Chakra.Modal onClose={onClose} isOpen={isOpen}>
        <Chakra.ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <Chakra.ModalContent maxW="2xl" margin={0}>
          <AssessmentForm />
          <Chakra.ModalCloseButton />
        </Chakra.ModalContent>
      </Chakra.Modal>
    </Chakra.Stack>
  )
}

export default Header
