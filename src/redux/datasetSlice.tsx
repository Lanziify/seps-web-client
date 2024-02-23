import { createSlice } from '@reduxjs/toolkit'

const datasetSlice = createSlice({
  name: 'dataset',
  initialState: {
    dataset: [],
    page: 1,
    pageSize: 10,
    total: 0,
    isLoadingDataset: true,
  },
  reducers: {
    setDataset: (state, action) => {
      state.dataset = action.payload
      state.isLoadingDataset = false
    },
    setDatasetPage: (state, action) => {
      state.page = action.payload
    },
    setDatasetPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    setDatasetTotal: (state, action) => {
      state.total = action.payload
    },
  },
})

export const {
  setDataset,
  setDatasetPage,
  setDatasetPageSize,
  setDatasetTotal
} = datasetSlice.actions
export default datasetSlice.reducer
