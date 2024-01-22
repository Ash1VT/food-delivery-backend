export default interface IObjectToDtoMapper<DtoModel> {
    parse(data: any): DtoModel
}