import { createSlice } from '@reduxjs/toolkit'

const datasetSlice = createSlice({
  name: 'dataset',
  initialState: {
    dataset: [],
    datasetPage: 1,
    datasetPageSize: 10,
    datasetTotalItem: 0,
    isLoadingDataset: true,
  },
  reducers: {
    setDataset: (state, action) => {
      state.dataset = action.payload
      state.isLoadingDataset = false
    },
    setDatasetPage: (state, action) => {
      state.datasetPage = action.payload
    },
    setDatasetPageSize: (state, action) => {
      state.datasetPageSize = action.payload
    },
    setDatasetTotalItems: (state, action) => {
      state.datasetTotalItem = action.payload
    },
  },
})

export const {
  setDataset,
  setDatasetPage,
  setDatasetPageSize,
  setDatasetTotalItems,
} = datasetSlice.actions
export default datasetSlice.reducer
