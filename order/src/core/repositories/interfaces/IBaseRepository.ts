export default interface IBaseRepository<Model, CreateInput, UpdateInput> {
    getOne(id: number): Promise<Model | null>
    getMany(): Promise<Model[]>
    create(data: CreateInput): Promise<Model>
    update(id: number, data: UpdateInput): Promise<Model | null>
    delete(id: number): void
    exists(id: number): Promise<boolean>
}