import { OrderCreateInputDto, OrderCreateOutputDto, OrderGetOutputDto } from "../../dto/order.dto";
import { OrderCreateInput, OrderModel } from "../../models/order.models";
import { OrderAdditionalData } from "../additionalData";
import { IDeliveryInformationCreateMapper, IDeliveryInformationGetMapper } from "../interfaces/deliveryInformation.mappers";
import { IOrderGetMapper, IOrderCreateMapper } from "../interfaces/order.mappers";
import { IOrderItemCreateMapper, IOrderItemGetMapper } from "../interfaces/orderItem.mappers";

export class OrderGetMapper implements IOrderGetMapper {

    constructor(
        protected orderItemGetMapper: IOrderItemGetMapper,
        protected deliveryInformationGetMapper: IDeliveryInformationGetMapper
    ) {}

    toDto(dbModel: OrderModel): OrderGetOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            customerId: dbModel.customerId.toString(),
            courierId: dbModel.courierId ? dbModel.courierId.toString() : undefined,
            restaurantId: dbModel.restaurantId.toString(),
            promocodeName: dbModel.promocodeName ? dbModel.promocodeName : undefined,
            promocodeDiscount: dbModel.promocodeDiscount ? dbModel.promocodeDiscount : undefined,
            promotionId: dbModel.promotionId ? dbModel.promotionId.toString() : undefined,
            createdAt: dbModel.createdAt.toISOString(),
            deliveryInformation: dbModel.deliveryInformation ? this.deliveryInformationGetMapper.toDto(dbModel.deliveryInformation) : undefined,
            items: dbModel.items?.map((orderItem) => this.orderItemGetMapper.toDto(orderItem))
        }
    }

}

export class OrderCreateMapper implements IOrderCreateMapper {

    constructor(
        protected orderItemCreateMapper: IOrderItemCreateMapper,
        protected deliveryInformationCreateMapper: IDeliveryInformationCreateMapper
    ) {}

    toDto(dbModel: OrderModel): OrderCreateOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            customerId: dbModel.customerId.toString(),
            courierId: dbModel.courierId ? dbModel.courierId.toString() : undefined,
            restaurantId: dbModel.restaurantId.toString(),
            promocodeName: dbModel.promocodeName ? dbModel.promocodeName : undefined,
            promocodeDiscount: dbModel.promocodeDiscount ? dbModel.promocodeDiscount : undefined,
            promotionId: dbModel.promotionId ? dbModel.promotionId.toString() : undefined,
            createdAt: dbModel.createdAt.toISOString(),
            deliveryInformation: dbModel.deliveryInformation ? this.deliveryInformationCreateMapper.toDto(dbModel.deliveryInformation) : undefined,
            items: dbModel.items?.map((orderItem) => this.orderItemCreateMapper.toDto(orderItem))
        }
    }

    toDbModel(dtoModel: OrderCreateInputDto, additionalData: OrderAdditionalData): OrderCreateInput {
        return {
            customerId: additionalData.customerId,
            restaurantId: dtoModel.restaurantId,
            promocodeName: additionalData.promocodeName,
            promocodeDiscount: additionalData.promocodeDiscount,
            promotionId: dtoModel.promotionId ? dtoModel.promotionId : undefined,
            deliveryInformationId: additionalData.deliveryInformationId,
            totalPrice: Number(additionalData.totalPrice.toFixed(2)),
            decountedPrice: Number(additionalData.decountedPrice.toFixed(2)),
            items: {
                create: dtoModel.items.map((orderItem, index) => {
                    const data = additionalData.items[index]
                    return this.orderItemCreateMapper.toDbModelWithOrder(orderItem, data)
                })
            }
        }
    }

}