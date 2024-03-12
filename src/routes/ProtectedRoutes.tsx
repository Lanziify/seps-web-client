import * as React from 'react'
import * as Chakra from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { setDataset, setDatasetTotalItems } from '../redux/datasetSlice'
import {
  setPredictionTotalItems,
  setPredictionsList,
} from '../redux/predictionSlice'
import Preloader from '../components/Preloader'
import useAxiosInterceptor from '../hooks/useAxiosInterceptor'

const ProtectedRoutes = () => {
  const { user, isUserLoading, token } = useAuth()
  const location = useLocation()
  const dispatch = useDispatch()
  const axios = useAxiosInterceptor()
  const toast = Chakra.useToast()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const { predictionPage, predictionPageSize } = useSelector(
    (state: any) => state.predictions
  )
  const { datasetPage, datasetPageSize } = useSelector(
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
    const predictionShortPoll = setInterval(() => {
      fetchPredictions()
    }, 5000)

    return () => {
      clearInterval(predictionShortPoll)
    }
  }, [predictionPage, predictionPageSize])

  React.useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await axios.get(
          `/dataset?page=${datasetPage}&limit=${datasetPageSize}`
        )
        const stringifiedResponse = JSON.stringify(response.data.datasets)
        if (stringifiedResponse) {
          dispatch(setDataset(JSON.parse(stringifiedResponse)))
          dispatch(setDatasetTotalItems(response.data.total_items))
        }
      } catch (error: any) {
        console.log(error)
        toast({
          title: error.message,
          position: 'top',
          status: 'error',
          variant: 'left-accent',
          isClosable: true,
        })
      }
    }

    const dataShortPoll = setInterval(() => {
      fetchDatasets()
    }, 5000)

    return () => {
      clearInterval(dataShortPoll)
    }
  }, [datasetPage, datasetPageSize])

  if (!token && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (isUserLoading) return <Preloader />

  const handleMenuToggle = () => {
    setIsMenuOpen(previous => !previous)
  }

  return (
    <Chakra.Stack>
      <Header toggleMenu={handleMenuToggle} />
      <Chakra.Container
        as="main"
        width="100%"
        maxWidth="8xl"
        margin="auto"
        padding={0}
      >
        <Chakra.Flex>
          <SideBar isMenuOpen={isMenuOpen} />
          <Chakra.Stack width="100%" overflow="auto">
            <Outlet />
          </Chakra.Stack>
        </Chakra.Flex>
      </Chakra.Container>
    </Chakra.Stack>
  )
}

export default ProtectedRoutes
