import IPrismaDelegate from "../interfaces/prisma/IPrismaDelegate"
import IBaseRepository from "../interfaces/IBaseRepository"

export default abstract class PrismaBaseRepository<
    Delegate extends IPrismaDelegate,
    Model,
    CreateInput,
    UpdateInput
> implements IBaseRepository<Model, CreateInput, UpdateInput> {

    constructor(
        protected delegate: Delegate
    ) {}

    public async getOne(id: number): Promise<Model | null> {
        return await this.delegate.findFirst({
            where: {
                id
            }
        })
    }

    public async getMany(): Promise<Model[]> {
        return await this.delegate.findMany()
    }

    public async create(data: CreateInput): Promise<Model> {
        return await this.delegate.create({
            data
        })
    }

    public async update(id: number, data: UpdateInput): Promise<Model | null> {
        return await this.delegate.update({
            where: {
                id
            },
            data
        })
    }

    public async delete(id: number) {
        await this.delegate.delete({
            where: {
                id
            }
        })
    }
}