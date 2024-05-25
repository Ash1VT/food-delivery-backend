import getLogger from "@src/core/setup/logger";
import { OrderCreateInputDto, OrderCreateOutputDto, OrderGetOutputDto, OrderUpdateOutputDto } from "../../dto/order.dto";
import { OrderCreateInput, OrderModel } from "../../models/order.models";
import { OrderAdditionalData } from "../additionalData";
import { IDeliveryInformationCreateMapper, IDeliveryInformationGetMapper, IDeliveryInformationUpdateMapper } from "../interfaces/deliveryInformation.mappers";
import { IOrderGetMapper, IOrderCreateMapper, IOrderUpdateMapper } from "../interfaces/order.mappers";
import { IOrderItemCreateMapper, IOrderItemGetMapper, IOrderItemUpdateMapper } from "../interfaces/orderItem.mappers";
import { IPriceInformationCreateMapper, IPriceInformationGetMapper, IPriceInformationUpdateMapper } from "../interfaces/priceInformation.mappers";


const logger = getLogger(module)

export class OrderGetMapper implements IOrderGetMapper {

    constructor(
        protected orderItemGetMapper: IOrderItemGetMapper,
        protected deliveryInformationGetMapper: IDeliveryInformationGetMapper,
        protected priceInformationGetMapper: IPriceInformationGetMapper
    ) {}

    toDto(dbModel: OrderModel): OrderGetOutputDto {
        const data = {
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

        logger.debug(`Mapped database OrderModel with id=${dbModel.id} to OrderGetOutputDto`)

        return data
    }

}

export class OrderCreateMapper implements IOrderCreateMapper {

    constructor(
        protected orderItemCreateMapper: IOrderItemCreateMapper,
        protected deliveryInformationCreateMapper: IDeliveryInformationCreateMapper,
        protected priceInformationCreateMapper: IPriceInformationCreateMapper
    ) {}

    toDto(dbModel: OrderModel): OrderCreateOutputDto {
        const data = {
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

        logger.debug(`Mapped database OrderModel with id=${dbModel.id} to OrderCreateOutputDto`)

        return data
    }

    toDbModel(dtoModel: OrderCreateInputDto, additionalData: OrderAdditionalData): OrderCreateInput {
        const data = {
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

        logger.debug(`Mapped OrderCreateInputDto to database OrderCreateInput`)

        return data
    }

}


export class OrderUpdateMapper implements IOrderUpdateMapper {
    constructor(
        protected orderItemUpdateMapper: IOrderItemUpdateMapper,
        protected deliveryInformationUpdateMapper: IDeliveryInformationUpdateMapper,
        protected priceInformationUpdateMapper: IPriceInformationUpdateMapper
    ) {}

    toDto(dbModel: OrderModel): OrderUpdateOutputDto {
        const data = {
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

        logger.debug(`Mapped database OrderModel with id=${dbModel.id} to OrderUpdateOutputDto`)

        return data
    }

}