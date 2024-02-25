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

const Header = () => {
  const initialFocusRef = React.useRef(null)
  const { user, logoutUser } = useAuth()
  return (
    <Chakra.Stack
      position="sticky"
      backgroundColor="white"
      top={0}
      boxShadow="sm"
      zIndex={10}
    >
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
        <Chakra.Text
          as="h1"
          fontSize={14}
          fontWeight={900}
          flexShrink={0}
          color="purple.500"
        >
          Student Employability Prediction
        </Chakra.Text>
        <Chakra.InputGroup width="100%" maxWidth="2xl" hideBelow="md">
          <Chakra.Input variant="filled" placeholder="Search" />
          <Chakra.InputLeftElement>
            <IoSearchOutline size={18} />
          </Chakra.InputLeftElement>
        </Chakra.InputGroup>
        <Chakra.Stack direction="row" hideBelow="sm">
          <Chakra.Button colorScheme="gray" size="sm" hideBelow="md">
            Evaluate Student
          </Chakra.Button>
          <Chakra.IconButton
            aria-label="profile"
            size="sm"
            background="transparent"
            icon={<IoFileTray size={18} />}
            color="gray.400"
          />
          <Chakra.IconButton
            aria-label="profile"
            size="sm"
            background="transparent"
            icon={<IoSettings size={18} />}
            color="gray.400"
          />
          <Chakra.IconButton
            aria-label="profile"
            size="sm"
            background="purple.400"
            icon={<IoPerson size={18} />}
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
                    <Chakra.AvatarBadge boxSize='1.25em' bg='green.500' />
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
                  <Chakra.Flex gap={4} alignItems="center">
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
                  <Chakra.Button size='sm' width='100%' onClick={logoutUser}>Logout</Chakra.Button>
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
    </Chakra.Stack>
  )
}

export default Header
