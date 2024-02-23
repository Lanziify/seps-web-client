import { configureStore } from "@reduxjs/toolkit";
import datasetSlice from "./datasetSlice";

export default configureStore({
    reducer: {
        dataset: datasetSlice
    }
})