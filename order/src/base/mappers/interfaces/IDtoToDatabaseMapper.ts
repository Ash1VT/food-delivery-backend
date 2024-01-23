export default interface IDtoToDatabaseMapper<DtoModel, DatabaseModel, DbModelAdditionalData> {
    toDbModel(dtoModel: DtoModel, additionalData: DbModelAdditionalData): DatabaseModel
    toDbModels(dtoModels: DtoModel[], additionalData: DbModelAdditionalData[]): DatabaseModel[]
}