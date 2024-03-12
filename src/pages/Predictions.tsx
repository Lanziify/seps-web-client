import * as Chakra from '@chakra-ui/react'
import { ThemeProvider, createTheme } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridToolbar,
} from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { IPredictions } from '../types/IPredictions'
import { ChakraProvider } from '@chakra-ui/react'
import {
  setPredictionPage,
  setPredictionPageSize,
} from '../redux/predictionSlice'
import moment from 'moment'
import SkeletonTableLoader from '../components/SkeletonTableLoader'

const Predictions = () => {
  const {
    predictions,
    predictionPage,
    predictionPageSize,
    predictionTotalItems,
    isLoadingPrediction,
  } = useSelector((state: IPredictions) => state.predictions)

  const dispatch = useDispatch()

  const columns: GridColDef[] = [
    {
      field: 'prediction_id',
      headerName: 'Prediction ID',
      width: 130,
    },
    {
      field: 'avatar',
      headerName: 'Avatar',
      renderCell: (params: GridRenderCellParams) => (
        <ChakraProvider>
          <Chakra.Avatar name={params.row.predicted_by} size="xs" />
        </ChakraProvider>
      ),
      width: 80,
    },
    {
      field: 'predicted_by',
      headerName: 'Predicted By',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      renderCell: (params: GridRenderCellParams) => (
        <p>
          {params.row.email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2')}
        </p>
      ),
      flex: 1.3,
    },
    {
      field: 'dataset_id',
      headerName: 'Data ID',
    },
    {
      field: 'classification',
      headerName: 'Prediction',
      renderCell: (params: GridRenderCellParams) => (
        <strong>{params.row.classification}</strong>
      ),
      flex: 1,
    },
    {
      field: 'prediction_time',
      headerName: 'Prediction Time',
      valueFormatter: (params: GridValueFormatterParams) => {
        const date = new Date(params.value)
        return date
          .toLocaleDateString('en-PH', {
            year: 'numeric',
            weekday: 'short',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            // timeZone: 'Asia/Manila',
          })
          .replace(/\//g, '-')
      },
      flex: 1,
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


  return (
    <Chakra.Stack padding={4} maxWidth="100%">
      <Chakra.Heading
        as="h1"
        size="xl"
        fontWeight={700}
        textAlign="center"
        marginBottom={8}
      >
        Predictions Table
      </Chakra.Heading>
      <ThemeProvider theme={MuiTheme}>
        <DataGrid
          slots={{ toolbar: GridToolbar, loadingOverlay: SkeletonTableLoader}}
          slotProps={{
            toolbar: {
              csvOptions: {
                fields: [
                  'prediction_id',
                  'predicted_by',
                  'dataset_id',
                  'classification',
                  'prediction_time',
                ],
                fileName: `SEPS-Predictions - ${moment().format(
                  'YYYY-MM-DD hh:mm:ss'
                )}`,
              },
              printOptions: {
                disableToolbarButton: true,
              },
            },
          }}
          autoHeight
          getRowId={(row) => row.prediction_id}
          rows={predictions}
          columns={columns}
          paginationMode="server"
          pageSizeOptions={[predictionPageSize, 20, 50]}
          paginationModel={{
            page: predictionPage - 1,
            pageSize: predictionPageSize,
          }}
          onPaginationModelChange={(change: any) => {
            dispatch(setPredictionPage(change.page + 1))
            dispatch(setPredictionPageSize(change.pageSize))
          }}
          rowCount={predictionTotalItems}
          loading={isLoadingPrediction}
          disableRowSelectionOnClick
        />
      </ThemeProvider>
    </Chakra.Stack>
  )
}

export default Predictions
