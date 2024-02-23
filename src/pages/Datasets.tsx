import * as Chakra from '@chakra-ui/react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material'
import type {} from '@mui/x-data-grid/themeAugmentation'
import { setDatasetPage, setDatasetPageSize } from '../redux/datasetSlice'

const Datasets = () => {
  const dispatch = useDispatch()
  const { dataset, page, pageSize, total, isLoadingDataset } = useSelector(
    (state: any) => state.dataset
  )

  const columns: GridColDef[] = [
    { field: 'data_id', headerName: 'ID' },
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
      valueGetter: (value: GridValueGetterParams) =>
        value.row.already_predicted.toString().charAt(0).toUpperCase() +
        value.row.already_predicted.toString().slice(1),
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
    <ThemeProvider theme={MuiTheme}>
      <Chakra.Stack padding={4} maxWidth="100%">
        <DataGrid
          autoHeight
          getRowId={(row) => row.data_id}
          rows={dataset}
          columns={columns}
          checkboxSelection
          paginationMode="server"
          pageSizeOptions={[10, 20, 50]}
          paginationModel={{
            page: page - 1,
            pageSize: pageSize,
          }}
          onPaginationModelChange={(change: any) => {
            dispatch(setDatasetPage(change.page + 1))
            dispatch(setDatasetPageSize(change.pageSize))
          }}
          rowCount={total}
          loading={isLoadingDataset}
          disableRowSelectionOnClick
        />
      </Chakra.Stack>
    </ThemeProvider>
  )
}

export default Datasets
