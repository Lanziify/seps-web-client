import * as Chakra from '@chakra-ui/react'
import { menuItems } from '../data/MenuItems'
import { NavLink } from 'react-router-dom'
import { IoLogOut } from 'react-icons/io5'
import { useAuth } from '../context/AuthContext'

const SideBar = () => {
  const { logoutUser } = useAuth()
  return (
    <Chakra.Stack
      position="sticky"
      left={0}
      bottom={0}
      // width="sm"
      minWidth='15rem'
      height="calc(100vh - 5.5rem)"
      className="top-[75px]"
      spacing={0}
      hideBelow="md"
    >
      <Chakra.Stack height="100%" justifyContent="space-between">
        <Chakra.Stack>
          {menuItems.map((item, index) => (
            <Chakra.Button
              as={NavLink}
              key={index}
              to={item.path}
              fontWeight={500}
              color="gray.500"
              rounded="md"
              colorScheme="purple"
              _hover={{
                textColor: 'purple.400',
                background: 'purple.50',
              }}
              _activeLink={{
                fontWeight: 700,
                color: 'purple.500',
              }}
              background="transparent"
              leftIcon={item.icon}
              justifyContent="flex-start"
            >
              {item.name}
            </Chakra.Button>
          ))}
        </Chakra.Stack>

        <Chakra.Button
          color="gray.500"
          background="transparent"
          leftIcon={<IoLogOut />}
          _hover={{
            textColor: 'red.400',
            background: 'red.50',
          }}
          onClick={logoutUser}
        >
          Logout
        </Chakra.Button>
      </Chakra.Stack>
    </Chakra.Stack>
  )
}

export default SideBar
