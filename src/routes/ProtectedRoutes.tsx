import * as React from 'react'
import * as Chakra from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import axios from '../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setDataset, setDatasetTotalItems } from '../redux/datasetSlice'
import {
  setPredictionTotalItems,
  setPredictionsList,
} from '../redux/predictionSlice'

const ProtectedRoutes = () => {
  const { user, isUserLoading, token } = useAuth()
  const location = useLocation()
  const dispatch = useDispatch()

  const toast = Chakra.useToast()

  const { predictionPage, predictionPageSize } = useSelector(
    (state: any) => state.predictions
  )
  const { datesetPage, dasetPageSize } = useSelector(
    (state: any) => state.dataset
  )

  React.useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(
          `/predictions?page=${predictionPage}&limit=${predictionPageSize}`
        )
        const stringifiedResponse = JSON.stringify(response.data.predictions)
        if (stringifiedResponse) {
          dispatch(setPredictionsList(JSON.parse(stringifiedResponse)))
          dispatch(setPredictionTotalItems(response.data.total_items))
        }
      } catch (error: any) {
        toast({
          title: error.message,
          position: 'top',
          status: 'error',
          variant: 'left-accent',
          isClosable: true,
        })
      }
    }
    fetchPredictions()
  }, [predictionPage, predictionPageSize])

  React.useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await axios.get(
          `/dataset?page=${datesetPage}&limit=${dasetPageSize}`
        )
        const stringifiedResponse = JSON.stringify(response.data.datasets)
        if (stringifiedResponse) {
          dispatch(setDataset(JSON.parse(stringifiedResponse)))
          dispatch(setDatasetTotalItems(response.data.total_items))
        }
      } catch (error: any) {
        toast({
          title: error.message,
          position: 'top',
          status: 'error',
          variant: 'left-accent',
          isClosable: true,
        })
      }
    }
    fetchDatasets()
  }, [datesetPage, dasetPageSize])

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
