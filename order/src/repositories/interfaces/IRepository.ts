export default interface IRepository<T, K, M> {
    getOne(id: number): Promise<T | null>
    getMany(): Promise<T[]>
    create(data: K): Promise<T>
    update(id: number, data: M): Promise<T | null>
    delete(id: number): any
}