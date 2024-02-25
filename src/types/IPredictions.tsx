interface PredictionObject {
    [key: string]: any;
}
export interface IPredictions {
    predictions: PredictionObject,
    predictionPage: number,
    predictionPageSize: number,
    predictionTotalItems: number,
    isLoadingPrediction: boolean,
}