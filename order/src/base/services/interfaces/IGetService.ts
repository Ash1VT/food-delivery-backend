export default interface IGetService<GetDtoOutput> {
    getOne(id: number): Promise<GetDtoOutput>
    getMany(): Promise<GetDtoOutput[]>
}