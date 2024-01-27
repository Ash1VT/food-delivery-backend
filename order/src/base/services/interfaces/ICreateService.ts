export default interface ICreateService<CreateInputDto, CreateOutputDto> {
    create(data: CreateInputDto): Promise<CreateOutputDto>
}