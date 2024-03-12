import { IoHome, IoRocket, IoServer } from 'react-icons/io5'

export const menuItems = [
  {
    name: 'Home',
    path: '/home',
    icon: <IoHome size={24} />,
  },
  {
    name: 'Predictions',
    path: '/predictions',
    icon: <IoRocket size={24} />,
  },
  {
    name: 'Datasets',
    path: '/datasets',
    icon: <IoServer size={24} />,
  },
]
