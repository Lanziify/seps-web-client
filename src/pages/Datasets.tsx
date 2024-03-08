import * as React from 'react'
import * as Chakra from '@chakra-ui/react'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider, createTheme, Button } from '@mui/material'
import { ChakraProvider } from '@chakra-ui/react'
import type {} from '@mui/x-data-grid/themeAugmentation'
import { setDatasetPage, setDatasetPageSize } from '../redux/datasetSlice'
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'
import { useAuth } from '../context/AuthContext'
import useAxiosInterceptor from '../hooks/useAxiosInterceptor'
import moment from 'moment'
import SkeletonTableLoader from '../components/SkeletonTableLoader'

const Datasets = () => {
  const { token } = useAuth()
  const dispatch = useDispatch()
  const axios = useAxiosInterceptor()
  const { isOpen, onOpen, onClose } = Chakra.useDisclosure()
  const {
    dataset,
    datasetPage,
    datasetPageSize,
    datasetTotalItem,
    isLoadingDataset,
  } = useSelector((state: any) => state.dataset)

  const initialFocusRef = React.useRef(null)
  const [predictionQueue, setPredictionQueue] = React.useState<any | null>(null)
  const [isPredicting, setIsPredicting] = React.useState(false)
  const [hideModalButton, setHideModalButton] = React.useState(false)
  const [modalContent, setModalContent] = React.useState<{
    title: string
    body: string
  } | null>({
    title: '',
    body: '',
  })

  const columns: GridColDef[] = [
    { field: 'data_id', headerName: 'Data ID', flex: 1 },
    { field: 'student_id', headerName: 'Student ID', flex: 1 },
    {
      field: 'general_appearance',
      headerName: 'General Appearance',
      flex: 1,
    },
    {
      field: 'manner_of_speaking',
      headerName: 'Manner of Speaking',
      flex: 1,
    },
    {
      field: 'physical_condition',
      headerName: 'Physical Condition',
      flex: 1,
    },
    {
      field: 'mental_alertness',
      headerName: 'Mental Alertness',
      flex: 1,
    },
    {
      field: 'self_confidence',
      headerName: 'Self Confidence',
      flex: 1,
    },
    {
      field: 'ability_to_present_ideas',
      headerName: 'Ability to Present Ideas',
      flex: 1,
    },
    {
      field: 'communication_skills',
      headerName: 'Communication Skills',
      flex: 1,
    },
    {
      field: 'performance_rating',
      headerName: 'Performance Rating',
      flex: 1,
    },
    {
      field: 'already_predicted',
      headerName: 'Predicted',
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        params.row.already_predicted ? (
          <IoCheckmarkCircleOutline
            size={24}
            className="m-auto text-green-500"
          />
        ) : (
          <IoCloseCircleOutline size={24} className="m-auto text-red-500" />
        ),
    },
    {
      field: 'action',
      headerName: 'Actions',
      renderCell: (params: GridRenderCellParams) =>
        !params.row.already_predicted ? (
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#805AD5',
              textTransform: 'none',
              ':hover': {
                backgroundColor: '#6B46C1',
              },
            }}
            size="small"
            disableElevation
            onClick={() => {
              setPredictionQueue(params.row)
              setModalContent({
                title: 'Predict Student Employability',
                body: 'Are you sure you want to predict this data?',
              })
              onOpen()
            }}
          >
            Predict
          </Button>
        ) : (
          <ChakraProvider>
            <Chakra.Popover
              initialFocusRef={initialFocusRef}
              placement="bottom-end"
              closeOnBlur={false}
            >
              <Chakra.PopoverTrigger>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#38B2AC',
                    textTransform: 'none',
                    ':hover': {
                      backgroundColor: '#319795',
                    },
                  }}
                  size="small"
                  disableElevation
                >
                  Done
                </Button>
              </Chakra.PopoverTrigger>
              <Chakra.Portal>
                <Chakra.PopoverContent bg="teal.400" color="white" rounded="md">
                  <Chakra.PopoverHeader fontWeight="bold" border="0">
                    Data is already predicted
                  </Chakra.PopoverHeader>
                  <Chakra.PopoverArrow bg="teal.400" />
                  <Chakra.PopoverCloseButton />
                  <Chakra.PopoverBody>
                    Please check predictions section to view more details.
                  </Chakra.PopoverBody>
                </Chakra.PopoverContent>
              </Chakra.Portal>
            </Chakra.Popover>
          </ChakraProvider>
        ),
    },
  ]

  const MuiTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#805AD5'
      },
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: 0,
          },
        },
      },
    },
  })

  const handlePredict = async () => {
    try {
      setIsPredicting(true)
      const response = await axios.post(
        '/model/predict',
        {
          datasetId: predictionQueue?.data_id,
        },
        {
          headers: {
            Authorization: token?.accessToken,
          },
        }
      )

      setModalContent({
        title: response.data.title,
        body: response.data.body,
      })
      setHideModalButton(true)
      setIsPredicting(false)
    } catch (error) {
      console.log(error)
    }
  }

  const renderModalContent = () => {
    if (modalContent?.body) {
      return (
        <div dangerouslySetInnerHTML={{ __html: modalContent?.body }}></div>
      )
    } else {
      return null
    }
  }

  return (
    <Chakra.Stack padding={4} maxWidth="100%">
      <Chakra.Heading
        as="h1"
        size="xl"
        fontWeight={700}
        textAlign="center"
        marginBottom={8}
      >
        Evaluation Datasets
      </Chakra.Heading>

      <ThemeProvider theme={MuiTheme}>
        <DataGrid
          slots={{ toolbar: GridToolbar, loadingOverlay: SkeletonTableLoader }}
          slotProps={{
            toolbar: {
              csvOptions: {
                fields: [
                  'data_id',
                  'general_appearance',
                  'manner_of_speaking',
                  'physical_condition',
                  'mental_alertness',
                  'self_confidence',
                  'ability_to_present_ideas',
                  'communication_skills',
                  'performance_rating',
                ],
                fileName: `SEPS-Dataset - ${moment().format(
                  'YYYY-MM-DD hh:mm:ss'
                )}`,
              },
              printOptions: {
                disableToolbarButton: true,
              },
            },
          }}
          autoHeight
          getRowId={(row) => row.data_id}
          rows={dataset}
          columns={columns}
          paginationMode="server"
          pageSizeOptions={[datasetPageSize, 20, 50]}
          paginationModel={{
            page: datasetPage - 1,
            pageSize: datasetPageSize,
          }}
          onPaginationModelChange={(change: any) => {
            dispatch(setDatasetPage(change.page + 1))
            dispatch(setDatasetPageSize(change.pageSize))
          }}
          rowCount={datasetTotalItem}
          loading={isLoadingDataset}
          disableRowSelectionOnClick
        />
      </ThemeProvider>

      <Chakra.Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={isPredicting ? false : true}
      >
        <Chakra.ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <Chakra.ModalContent width={isPredicting ? 'fit-content' : 'inherit'}>
          {!isPredicting && (
            <Chakra.ModalHeader>{modalContent?.title}</Chakra.ModalHeader>
          )}
          {!isPredicting && (
            <Chakra.ModalCloseButton
              onClick={() => {
                setModalContent(null)
                setPredictionQueue(null)
                setHideModalButton(false)
              }}
            />
          )}
          <Chakra.ModalBody>
            {!isPredicting && renderModalContent()}
            {isPredicting && <Chakra.Spinner size="xl" />}
          </Chakra.ModalBody>
          {!isPredicting && (
            <Chakra.ModalFooter>
              {!hideModalButton && (
                <Chakra.Button colorScheme="purple" onClick={handlePredict}>
                  Confirm
                </Chakra.Button>
              )}
            </Chakra.ModalFooter>
          )}
        </Chakra.ModalContent>
      </Chakra.Modal>
    </Chakra.Stack>
  )
}

export default Datasets
