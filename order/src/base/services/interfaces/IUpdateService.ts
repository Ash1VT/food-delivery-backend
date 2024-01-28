export default interface IUpdateService<UpdateInputDto, UpdateOutputDto> {
    update(id: number, data: UpdateInputDto): Promise<UpdateOutputDto>
}