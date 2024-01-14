import IDelegate from "./interfaces/IDelegate"
import IRepository from "./interfaces/IRepository"

export default abstract class BaseRepository<
    Delegate extends IDelegate,
    Model,
    CreateInput,
    UpdateInput
> implements IRepository<Model, CreateInput, UpdateInput> {

    constructor(
        protected delegate: Delegate
    ) {}

    async getOne(id: number): Promise<Model | null> {
        return await this.delegate.findFirst({
            where: {
                id
            }
        })
    }

    async getMany(): Promise<Model[]> {
        return await this.delegate.findMany()
    }

    async create(data: CreateInput): Promise<Model> {
        return await this.delegate.create({
            data
        })
    }

    async update(id: number, data: UpdateInput): Promise<Model | null> {
        return await this.delegate.update({
            where: {
                id
            },
            data
        })
    }

    async delete(id: number) {
        await this.delegate.delete({
            where: {
                id
            }
        })
    }
}