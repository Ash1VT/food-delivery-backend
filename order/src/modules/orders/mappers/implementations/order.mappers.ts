import { OrderCreateInputDto, OrderCreateOutputDto, OrderGetOutputDto, OrderUpdateOutputDto } from "../../dto/order.dto";
import { OrderCreateInput, OrderModel } from "../../models/order.models";
import { OrderAdditionalData } from "../additionalData";
import { IDeliveryInformationCreateMapper, IDeliveryInformationGetMapper, IDeliveryInformationUpdateMapper } from "../interfaces/deliveryInformation.mappers";
import { IOrderGetMapper, IOrderCreateMapper, IOrderUpdateMapper } from "../interfaces/order.mappers";
import { IOrderItemCreateMapper, IOrderItemGetMapper, IOrderItemUpdateMapper } from "../interfaces/orderItem.mappers";
import { IPriceInformationCreateMapper, IPriceInformationGetMapper, IPriceInformationUpdateMapper } from "../interfaces/priceInformation.mappers";

export class OrderGetMapper implements IOrderGetMapper {

    constructor(
        protected orderItemGetMapper: IOrderItemGetMapper,
        protected deliveryInformationGetMapper: IDeliveryInformationGetMapper,
        protected priceInformationGetMapper: IPriceInformationGetMapper
    ) {}

    toDto(dbModel: OrderModel): OrderGetOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            customerId: dbModel.customerId.toString(),
            courierId: dbModel.courierId ? dbModel.courierId.toString() : undefined,
            restaurantId: dbModel.restaurantId.toString(),
            createdAt: dbModel.createdAt.toISOString(),
            deliveryInformation: dbModel.deliveryInformation ? this.deliveryInformationGetMapper.toDto(dbModel.deliveryInformation) : undefined,
            priceInformation: dbModel.priceInformation ? this.priceInformationGetMapper.toDto(dbModel.priceInformation) : undefined,
            items: dbModel.items?.map((orderItem) => this.orderItemGetMapper.toDto(orderItem))
        }
    }

}

export class OrderCreateMapper implements IOrderCreateMapper {

    constructor(
        protected orderItemCreateMapper: IOrderItemCreateMapper,
        protected deliveryInformationCreateMapper: IDeliveryInformationCreateMapper,
        protected priceInformationCreateMapper: IPriceInformationCreateMapper
    ) {}

    toDto(dbModel: OrderModel): OrderCreateOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            customerId: dbModel.customerId.toString(),
            courierId: dbModel.courierId ? dbModel.courierId.toString() : undefined,
            restaurantId: dbModel.restaurantId.toString(),
            createdAt: dbModel.createdAt.toISOString(),
            deliveryInformation: dbModel.deliveryInformation ? this.deliveryInformationCreateMapper.toDto(dbModel.deliveryInformation) : undefined,
            priceInformation: dbModel.priceInformation ? this.priceInformationCreateMapper.toDto(dbModel.priceInformation) : undefined,
            items: dbModel.items?.map((orderItem) => this.orderItemCreateMapper.toDto(orderItem))
        }
    }

    toDbModel(dtoModel: OrderCreateInputDto, additionalData: OrderAdditionalData): OrderCreateInput {
        return {
            customerId: additionalData.customerId,
            restaurantId: dtoModel.restaurantId,
            deliveryInformationId: additionalData.deliveryInformationId,
            priceInformationId: additionalData.priceInformationId,
            items: {
                create: dtoModel.items.map((orderItem, index) => {
                    const data = additionalData.items[index]
                    return this.orderItemCreateMapper.toDbModelWithOrder(orderItem, data)
                })
            }
        }
    }

}


export class OrderUpdateMapper implements IOrderUpdateMapper {
    constructor(
        protected orderItemUpdateMapper: IOrderItemUpdateMapper,
        protected deliveryInformationUpdateMapper: IDeliveryInformationUpdateMapper,
        protected priceInformationUpdateMapper: IPriceInformationUpdateMapper
    ) {}

    toDto(dbModel: OrderModel): OrderUpdateOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            customerId: dbModel.customerId.toString(),
            courierId: dbModel.courierId ? dbModel.courierId.toString() : undefined,
            restaurantId: dbModel.restaurantId.toString(),
            createdAt: dbModel.createdAt.toISOString(),
            deliveryInformation: dbModel.deliveryInformation ? this.deliveryInformationUpdateMapper.toDto(dbModel.deliveryInformation) : undefined,
            priceInformation: dbModel.priceInformation ? this.priceInformationUpdateMapper.toDto(dbModel.priceInformation) : undefined,
            items: dbModel.items?.map((orderItem) => this.orderItemUpdateMapper.toDto(orderItem))
        }
    }

}