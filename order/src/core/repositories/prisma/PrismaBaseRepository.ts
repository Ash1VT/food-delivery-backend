import IPrismaDelegate from "../interfaces/IPrismaDelegate"
import IBaseRepository from "../interfaces/IBaseRepository"
import getLogger from "@src/core/setup/logger"


const logger = getLogger(module)


export default abstract class PrismaBaseRepository<
    Delegate extends IPrismaDelegate,
    Model,
    CreateInput,
    UpdateInput
> implements IBaseRepository<Model, CreateInput, UpdateInput> {

    constructor(
        protected delegate: Delegate
    ) {}

    public async getOne(id: bigint): Promise<Model | null> {
        const record = await this.delegate.findFirst({
            where: {
                id
            }
        })
        
        record ? logger.debug(`Retrieved record with id=${id}`) : logger.debug(`Record with id=${id} not found`)
        return record
    }

    public async getMany(): Promise<Model[]> {
        const records = await this.delegate.findMany()

        logger.debug(`Retrieved list of records`)
        
        return records
    }

    public async create(data: CreateInput): Promise<Model> {
        const createdRecord = await this.delegate.create({
            data
        })

        logger.debug(`Created record with id=${createdRecord.id}`)

        return createdRecord
    }

    public async update(id: bigint, data: UpdateInput): Promise<Model | null> {
        const updatedRecord = await this.delegate.update({
            where: {
                id
            },
            data
        })

        updatedRecord ? logger.debug(`Updated record with id=${id}`) : logger.debug(`Record with id=${id} not found`)

        return updatedRecord
    }

    public async delete(id: bigint) {
        await this.delegate.delete({
            where: {
                id
            }
        })

        logger.debug(`Deleted record with id=${id}`)
    }

    public async exists(id: bigint): Promise<boolean> {
        const exists = await this.delegate.count({
            where: {
                id
            }
        }) !== 0

        logger.debug(`Checked if record with id=${id} exists`)
        
        return exists
    }
}