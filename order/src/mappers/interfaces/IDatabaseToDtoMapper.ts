export default abstract class DatabaseToDtoMapper<DatabaseModel, DtoModel> {
    public abstract toDto(dbModel: DatabaseModel): DtoModel
    public abstract toDtos(dbModels: DatabaseModel[]): DtoModel[]
}