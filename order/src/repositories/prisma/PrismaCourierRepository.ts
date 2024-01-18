import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "./PrismaBaseRepository";
import { CourierCreateInput, CourierModel, CourierUpdateInput } from "../../models/courier";
import ICourierRepository from "../interfaces/ICourierRepository";
import { CourierDelegate } from "../types/prisma/delegate.type";


export default class PrismaCourierRepository extends PrismaBaseRepository<CourierDelegate, CourierModel, CourierCreateInput, CourierUpdateInput>
                                             implements ICourierRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.courier)
    }
    
    public async getOneWithOrders(id: number): Promise<CourierModel | null> {
        return await this.delegate.findFirst({
            where: {
                id
            },
            include: {
                orders: true
            }
        })
    }

    public async getManyWithOrders(): Promise<CourierModel[]> {
        return await this.delegate.findMany({
            include: {
                orders: true
            }
        })
    }
    
}