import { configureStore } from "@reduxjs/toolkit";
import datasetSlice from "./datasetSlice";
import predictionSlice from "./predictionSlice";

export default configureStore({
    reducer: {
        dataset: datasetSlice,
        predictions: predictionSlice
    }
})