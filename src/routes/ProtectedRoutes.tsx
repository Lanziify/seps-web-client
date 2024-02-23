import * as React from 'react'
import * as Chakra from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import axios from '../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setDataset, setDatasetTotal } from '../redux/datasetSlice'

const ProtectedRoutes = () => {
  const { user, isUserLoading, token } = useAuth()
  const location = useLocation()
  const dispatch = useDispatch()
  
  const { page, pageSize } = useSelector((state: any) => state.dataset)

  React.useEffect(() => {
    const fetchDatasets = async () => {
      const response = await axios.get(`/dataset?page=${page}&limit=${pageSize}`)
      const stringifiedResponse = JSON.stringify(response.data.datasets)
      if (stringifiedResponse) {
        dispatch(setDataset(JSON.parse(stringifiedResponse)))
        dispatch(setDatasetTotal(response.data.total_items))
      }
    }
    fetchDatasets()
  }, [page, pageSize])

  if (!token && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (isUserLoading) return

  return (
    <Chakra.Stack>
      <Header />
      <Chakra.Container
        as="main"
        width="100%"
        maxWidth="8xl"
        margin="auto"
        padding={0}
      >
        <Chakra.Flex>
          <SideBar />
          <Chakra.Stack width="100%" overflow="auto">
            <Outlet />
          </Chakra.Stack>
        </Chakra.Flex>
      </Chakra.Container>
    </Chakra.Stack>
  )
}

export default ProtectedRoutes
