export default interface IDtoToDatabaseMapper<DtoModel, DatabaseModel, AdditionalData> {
    toDbModel(dtoModel: DtoModel, additionalData: AdditionalData): DatabaseModel
    toDbModels(dtoModels: DtoModel[], additionalData: AdditionalData[]): DatabaseModel[]
}