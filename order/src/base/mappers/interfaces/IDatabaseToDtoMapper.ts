export default interface IDatabaseToDtoMapper<DatabaseModel, DtoModel, DtoModelAdditionalData> {
    toDto(dbModel: DatabaseModel, additionalData: DtoModelAdditionalData): DtoModel
    toDtos(dbModels: DatabaseModel[], additionalData: DtoModelAdditionalData[]): DtoModel[]
}