import { PrismaClient } from "@prisma/client";
import { OrderCreateInput, OrderModel, OrderUpdateInput } from "../../models/order";
import PrismaBaseRepository from "../../../../base/repositories/PrismaBaseRepository";
import IOrderRepository from "../interfaces/IOrderRepository";
import { OrderDelegate } from "./delegates";


export default class PrismaOrderRepository extends PrismaBaseRepository<OrderDelegate, OrderModel, OrderCreateInput, OrderUpdateInput>
                                           implements IOrderRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.order)
    }

    public async getOne(id: number): Promise<OrderModel | null> {
        return await this.delegate.findFirst({
            where: {
                id
            }
        })
    }
    public async create(data: OrderCreateInput): Promise<OrderModel> {
        return await this.delegate.create({
            data,
            include: {
                items: true
            }                
        })
    }

    public async getCustomerOrders(customerId: number): Promise<OrderModel[]> {
        return await this.delegate.findMany({
            where: {
                customerId
            }
        })
    }

    public async getRestaurantOrders(restaurantId: number): Promise<OrderModel[]> {
        return await this.delegate.findMany({
            where: {
                restaurantId
            }
        })
    }
    
    public async getCourierOrders(courierId: number): Promise<OrderModel[]> {
        return await this.delegate.findMany({
            where: {
                courierId
            }
        })
    }
}