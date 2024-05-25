import { PrismaClient } from "@prisma/client";
import { OrderCreateInput, OrderModel, OrderUpdateInput } from "../../../models/order.models";
import PrismaBaseRepository from "@src/core/repositories/prisma/PrismaBaseRepository";
import IOrderRepository from "../../interfaces/IOrderRepository";
import { OrderDelegate } from "./delegates";
import { OrderStatus } from "../../../models/orderStatus.models";
import getLogger from "@src/core/setup/logger";


const logger = getLogger(module)

export default class PrismaOrderRepository extends PrismaBaseRepository<OrderDelegate, OrderModel, OrderCreateInput, OrderUpdateInput> implements IOrderRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.order)
    }

    
    public async getOne(id: bigint, includeItems?: boolean, includeDeliveryInformation?: boolean, includePriceInformation?: boolean): Promise<OrderModel | null> {
        const order = await this.delegate.findFirst({
            where: {
                id
            },
            include: {
                items: !!includeItems,
                deliveryInformation: !!includeDeliveryInformation,
                priceInformation: !!includePriceInformation
            }
        })

        order ? logger.debug(`Retrieved Order with id=${id}`) : logger.debug(`Order with id=${id} not found`)

        return order
    }

    public async getMany(includeItems?: boolean, includeDeliveryInformation?: boolean, includePriceInformation?: boolean, status?: OrderStatus): Promise<OrderModel[]> {
        const orders = await this.delegate.findMany({
            where: {
                status
            },
            include: {
                items: !!includeItems,
                deliveryInformation: !!includeDeliveryInformation,
                priceInformation: !!includePriceInformation
            }
        })

        logger.debug(`Retrieved list of Orders`)

        return orders
    }

    public async create(data: OrderCreateInput): Promise<OrderModel> {
        const createdOrder = await this.delegate.create({
            data,
            include: {
                items: true,
                deliveryInformation: true,
                priceInformation: true
            }                
        })

        logger.debug(`Created Order with id=${createdOrder.id}`)

        return createdOrder
    }

    public async getCustomerOrders(customerId: bigint, includeItems?: boolean, includeDeliveryInformation?: boolean, includePriceInformation?: boolean, status?: OrderStatus): Promise<OrderModel[]> {
        const orders = await this.delegate.findMany({
            where: {
                customerId,
                status
            },
            include: {
                items: !!includeItems,
                deliveryInformation: !!includeDeliveryInformation,
                priceInformation: !!includePriceInformation
            }
        })

        logger.debug(`Retrieved list of Orders for Customer with id=${customerId}`)

        return orders
    }

    public async getRestaurantOrders(restaurantId: bigint, includeItems?: boolean, includeDeliveryInformation?: boolean, includePriceInformation?: boolean, status?: OrderStatus): Promise<OrderModel[]> {
        const orders = await this.delegate.findMany({
            where: {
                restaurantId,
                status
            },
            include: {
                items: !!includeItems,
                deliveryInformation: !!includeDeliveryInformation,
                priceInformation: !!includePriceInformation
            }
        })

        logger.debug(`Retrieved list of Orders for Restaurant with id=${restaurantId}`)

        return orders
    }
    
    public async getCourierOrders(courierId: bigint, includeItems?: boolean, includeDeliveryInformation?: boolean, includePriceInformation?: boolean, status?: OrderStatus): Promise<OrderModel[]> {
        const orders = await this.delegate.findMany({
            where: {
                courierId,
                status
            },
            include: {
                items: !!includeItems,
                deliveryInformation: !!includeDeliveryInformation,
                priceInformation: !!includePriceInformation
            }
        })

        logger.debug(`Retrieved list of Orders for Courier with id=${courierId}`)

        return orders
    }
}