import { createSlice } from '@reduxjs/toolkit'

const predictionSlice = createSlice({
  name: 'prediction',
  initialState: {
    predictions: [],
    predictionPage: 1,
    predictionPageSize: 10,
    predictionTotalItems: 0,
    isLoadingPrediction: true,
  },
  reducers: {
    setPredictionsList: (state, action) => {
      state.predictions = action.payload
      state.isLoadingPrediction = false
    },
    setPredictionPage: (state, action) => {
      state.isLoadingPrediction = true
      state.predictionPage = action.payload
    },
    setPredictionPageSize: (state, action) => {
      state.isLoadingPrediction = true
      state.predictionPageSize = action.payload
    },
    setPredictionTotalItems: (state, action) => {
      state.predictionTotalItems = action.payload
    },
  },
})

export const {
  setPredictionsList,
  setPredictionPage,
  setPredictionPageSize,
  setPredictionTotalItems,
} = predictionSlice.actions

export default predictionSlice.reducer
