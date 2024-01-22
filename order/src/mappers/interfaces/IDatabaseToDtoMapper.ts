export default interface DatabaseToDtoMapper<DatabaseModel, DtoModel, DtoModelAdditionalData> {
    toDto(dbModel: DatabaseModel, additionalData: DtoModelAdditionalData): DtoModel
    toDtos(dbModels: DatabaseModel[], additionalData: DtoModelAdditionalData[]): DtoModel[]
}