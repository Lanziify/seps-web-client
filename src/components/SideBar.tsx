import * as React from 'react'
import * as Chakra from '@chakra-ui/react'
import { menuItems } from '../data/MenuItems'
import { NavLink } from 'react-router-dom'
import { IoLogOut } from 'react-icons/io5'
import { useAuth } from '../context/AuthContext'
import { SideBarProps } from '../types/SideBarProps'

const SideBar = (props: SideBarProps) => {
  const { logoutUser } = useAuth()
  const sidebarRef = React.useRef(null)


  return (
    <Chakra.Stack
      ref={sidebarRef}
      position="sticky"
      left={0}
      bottom={0}
      w={props.isMenuOpen ? '3.7rem' : "15rem"}
      height="calc(100vh - 5rem)"
      className="top-[65px]"
      spacing={0}
      hideBelow="md"
    >
      <Chakra.Stack height="100%" justifyContent="space-between">
        <Chakra.Stack spacing={0}>
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
              transition="all 0.2s"
            >
              {!props.isMenuOpen ? item.name : null}
            </Chakra.Button>
          ))}
        </Chakra.Stack>

        <Chakra.Button
          color="gray.500"
          background="transparent"
          leftIcon={<IoLogOut size={24} />}
          _hover={{
            textColor: 'red.400',
            background: 'red.50',
          }}
          onClick={logoutUser}
        >
          {!props.isMenuOpen ? 'Logout' : null}
        </Chakra.Button>
      </Chakra.Stack>
    </Chakra.Stack>
  )
}

export default SideBar
