export default interface IBaseRepository<Model, CreateInput, UpdateInput> {
    getOne(id: bigint): Promise<Model | null>
    getMany(): Promise<Model[]>
    create(data: CreateInput): Promise<Model>
    update(id: bigint, data: UpdateInput): Promise<Model | null>
    delete(id: bigint): Promise<void>
    exists(id: bigint): Promise<boolean>
}