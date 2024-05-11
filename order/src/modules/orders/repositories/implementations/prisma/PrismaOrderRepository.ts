import { PrismaClient } from "@prisma/client";
import { OrderCreateInput, OrderModel, OrderUpdateInput } from "../../../models/order.models";
import PrismaBaseRepository from "@src/core/repositories/prisma/PrismaBaseRepository";
import IOrderRepository from "../../interfaces/IOrderRepository";
import { OrderDelegate } from "./delegates";
import { OrderStatus } from "../../../models/orderStatus.models";

export default class PrismaOrderRepository extends PrismaBaseRepository<OrderDelegate, OrderModel, OrderCreateInput, OrderUpdateInput> implements IOrderRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.order)
    }

    
    public async getOne(id: bigint, includeItems?: boolean, includeDeliveryInformation?: boolean): Promise<OrderModel | null> {
        return await this.delegate.findFirst({
            where: {
                id
            },
            include: {
                items: !!includeItems,
                deliveryInformation: !!includeDeliveryInformation
            }
        })
    }

    public async getMany(includeItems?: boolean, includeDeliveryInformation?: boolean, status?: OrderStatus): Promise<OrderModel[]> {
        return await this.delegate.findMany({
            where: {
                status
            },
            include: {
                items: !!includeItems,
                deliveryInformation: !!includeDeliveryInformation
            }
        })
    }

    public async create(data: OrderCreateInput): Promise<OrderModel> {
        return await this.delegate.create({
            data,
            include: {
                items: true,
                deliveryInformation: true
            }                
        })
    }

    public async getCustomerOrders(customerId: bigint, includeItems?: boolean, includeDeliveryInformation?: boolean, status?: OrderStatus): Promise<OrderModel[]> {
        return await this.delegate.findMany({
            where: {
                customerId,
                status
            },
            include: {
                items: !!includeItems,
                deliveryInformation: !!includeDeliveryInformation
            }
        })
    }

    public async getRestaurantOrders(restaurantId: bigint, includeItems?: boolean, includeDeliveryInformation?: boolean, status?: OrderStatus): Promise<OrderModel[]> {
        return await this.delegate.findMany({
            where: {
                restaurantId,
                status
            },
            include: {
                items: !!includeItems,
                deliveryInformation: !!includeDeliveryInformation
            }
        })
    }
    
    public async getCourierOrders(courierId: bigint, includeItems?: boolean, includeDeliveryInformation?: boolean, status?: OrderStatus): Promise<OrderModel[]> {
        return await this.delegate.findMany({
            where: {
                courierId,
                status
            },
            include: {
                items: !!includeItems,
                deliveryInformation: !!includeDeliveryInformation
            }
        })
    }
}