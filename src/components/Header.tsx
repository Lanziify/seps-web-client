// import React from 'react'
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
  const { user } = useAuth()
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
          <Chakra.Avatar size='sm' name={user.username}></Chakra.Avatar>
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
