import * as Chakra from '@chakra-ui/react'
import { ThemeProvider, createTheme } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { IPredictions } from '../types/IPredictions'
import { setDatasetPage, setDatasetPageSize } from '../redux/datasetSlice'
import { ChakraProvider } from '@chakra-ui/react'

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
        return date.toLocaleDateString('en-PH', {
          year: 'numeric',
          weekday: 'short',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: "Asia/Manila"
        }).replace(/\//g, "-")
      },
      flex: 1,
    },
  ]

  const MuiTheme = createTheme({
    palette: {
      mode: 'light',
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
      <Chakra.Heading as="h1" size="xl" fontWeight={700} textAlign="center">
        Predictions Table
      </Chakra.Heading>
      <ThemeProvider theme={MuiTheme}>
        <DataGrid
          autoHeight
          getRowId={(row) => row.prediction_id}
          rows={predictions}
          columns={columns}
          paginationMode="server"
          pageSizeOptions={[10, 20, 50]}
          paginationModel={{
            page: predictionPage - 1,
            pageSize: predictionPageSize,
          }}
          onPaginationModelChange={(change: any) => {
            dispatch(setDatasetPage(change.page + 1))
            dispatch(setDatasetPageSize(change.pageSize))
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
