export default function mapManyModels<SourceModel, ResultModel, AdditionalData>(sourceModels: SourceModel[], mapSingleModel: {(model: SourceModel, additionalData: AdditionalData): ResultModel}, additionalData: AdditionalData[]) {
    return sourceModels.map((sourceModel, index) => {
        const data = additionalData[index]
        return mapSingleModel(sourceModel, data)
    })
}