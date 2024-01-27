export default interface IUpdateService<UpdateInputDto, UpdateOutputDto> {
    update(data: UpdateInputDto): Promise<UpdateOutputDto>
}