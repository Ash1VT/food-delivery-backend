import { OrderCreateInputDTO, OrderCreateOutputDTO, OrderGetOutputDTO } from "../../dto/order";
import { OrderCreateInput, OrderModel } from "../../models/order";
import { OrderAdditionalData } from "../additionalData";
import { IOrderGetMapper, IOrderCreateMapper } from "../interfaces/order";
import { IOrderItemCreateMapper, IOrderItemGetMapper } from "../interfaces/orderItem";

export class OrderGetMapper implements IOrderGetMapper {

    constructor(
        protected orderItemGetMapper: IOrderItemGetMapper
    ) {}

    toDto(dbModel: OrderModel): OrderGetOutputDTO {
        return {
            id: Number(dbModel.id),
            customerId: Number(dbModel.customerId),
            courierId: dbModel.courierId ? Number(dbModel.courierId) : undefined,
            restaurantId: Number(dbModel.restaurantId),
            promocodeName: dbModel.promocodeName ? dbModel.promocodeName : undefined,
            promocodeDiscount: dbModel.promocodeDiscount ? dbModel.promocodeDiscount : undefined,
            promotionId: dbModel.promotionId ? Number(dbModel.promotionId) : undefined,
            status: dbModel.status,
            createdAt: dbModel.createdAt.toString(),
            deliveryAcceptedAt: dbModel.deliveryAcceptedAt?.toString(),
            supposedDeliveryTime: dbModel.supposedDeliveryTime.toString(),
            actualDeliveryTime: dbModel.actualDeliveryTime?.toString(),
            deliveryFinishedAt: dbModel.deliveryFinishedAt?.toString(),
            totalPrice: Number(dbModel.totalPrice.toFixed(2)),
            decountedPrice: Number(dbModel.decountedPrice.toFixed(2)),
            items: dbModel.items?.map((orderItem) => this.orderItemGetMapper.toDto(orderItem))
        }
    }

}

export class OrderCreateMapper implements IOrderCreateMapper {

    constructor(
        protected orderItemCreateMapper: IOrderItemCreateMapper
    ) {}

    toDto(dbModel: OrderModel): OrderCreateOutputDTO {
        return {
            id: Number(dbModel.id),
            customerId: Number(dbModel.customerId),
            courierId: dbModel.courierId ? Number(dbModel.courierId) : undefined,
            restaurantId: Number(dbModel.restaurantId),
            status: dbModel.status,
            promocodeName: dbModel.promocodeName ? dbModel.promocodeName : undefined,
            promocodeDiscount: dbModel.promocodeDiscount ? dbModel.promocodeDiscount : undefined,
            promotionId: dbModel.promotionId ? Number(dbModel.promotionId) : undefined,
            createdAt: dbModel.createdAt.toString(),
            deliveryAcceptedAt: dbModel.deliveryAcceptedAt?.toString(),
            supposedDeliveryTime: dbModel.supposedDeliveryTime.toString(),
            actualDeliveryTime: dbModel.actualDeliveryTime?.toString(),
            deliveryFinishedAt: dbModel.deliveryFinishedAt?.toString(),
            totalPrice: dbModel.totalPrice,
            decountedPrice: dbModel.decountedPrice,
            items: dbModel.items?.map((orderItem) => this.orderItemCreateMapper.toDto(orderItem))
        }
    }

    toDbModel(dtoModel: OrderCreateInputDTO, additionalData: OrderAdditionalData): OrderCreateInput {
        return {
            customerId: BigInt(additionalData.customerId),
            restaurantId: BigInt(dtoModel.restaurantId),
            promocodeName: additionalData.promocodeName,
            promocodeDiscount: additionalData.promocodeDiscount,
            promotionId: dtoModel.promotionId ? BigInt(dtoModel.promotionId) : undefined,
            supposedDeliveryTime: additionalData.supposedDeliveryTime,
            totalPrice: Number(additionalData.totalPrice.toFixed(2)),
            decountedPrice: Number(additionalData.decountedPrice.toFixed(2)),
            items: {
                create: dtoModel.items.map((orderItem, index) => {
                    const data = additionalData.itemsAdditionalData[index]
                    return this.orderItemCreateMapper.toDbModelWithOrder(orderItem, data)
                })
            }
        }
    }

}