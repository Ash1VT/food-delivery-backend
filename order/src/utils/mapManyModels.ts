export function mapManyModels<SourceModel, ResultModel>(sourceModels: SourceModel[], mapSingleModel: {(model: SourceModel): ResultModel}): ResultModel[] {
    return sourceModels.map((sourceModel) => mapSingleModel(sourceModel))
}

export function mapManyModelsWithAdditionalData<SourceModel, ResultModel, AdditionalData>(sourceModels: SourceModel[], mapSingleModel: {(model: SourceModel, additionalData: AdditionalData): ResultModel}, additionalData: AdditionalData[]): ResultModel[] {
    return sourceModels.map((sourceModel, index) => {
        const data = additionalData[index]
        return mapSingleModel(sourceModel, data)
    })
}
