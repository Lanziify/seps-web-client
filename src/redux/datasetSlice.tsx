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
      state.isLoadingDataset = true
      state.datasetPage = action.payload
    },
    setDatasetPageSize: (state, action) => {
      state.isLoadingDataset = true
      state.datasetPageSize = action.payload
    },
    setDatasetTotalItems: (state, action) => {
      state.datasetTotalItem = action.payload
    },
    triggerDatasetFetch: (state) => {
      state.isLoadingDataset = !state.isLoadingDataset
    },
  },
})

export const {
  setDataset,
  setDatasetPage,
  setDatasetPageSize,
  setDatasetTotalItems,
  triggerDatasetFetch,
} = datasetSlice.actions
export default datasetSlice.reducer
