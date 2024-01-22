import { OrderCreateInputDTO, OrderCreateOutputDTO, OrderGetOutputDTO } from "../dto/order";
import { OrderCreateInput, OrderModel } from "../models/order";
import { IOrderGetMapper, IOrderCreateMapper } from "./interfaces/instances/order";
import { IOrderItemGetMapper, IOrderItemWithOrderCreateMapper } from "./interfaces/instances/orderItem";
import { OrderCreateDbModelAdditionalData, OrderCreateDtoModelAdditionalData, OrderGetDtoModelAdditionalData } from "./types/additionalData";
import mapManyModels from "./utils";

export class OrderGetMapper implements IOrderGetMapper {

    constructor(
        protected orderItemGetMapper: IOrderItemGetMapper
    ) {}

    toDto(dbModel: OrderModel, additionalData: OrderGetDtoModelAdditionalData): OrderGetOutputDTO {
        return {
            id: Number(dbModel.id),
            customerId: Number(dbModel.customerId),
            courierId: Number(dbModel.courierId),
            restaurantId: Number(dbModel.restaurantId),
            promocode: additionalData.promocode,
            status: dbModel.status,
            createdAt: dbModel.createdAt.toString(),
            supposedDeliveryTime: dbModel.supposedDeliveryTime.toString(),
            totalPrice: dbModel.totalPrice,
            decountedPrice: dbModel.decountedPrice,
            items: dbModel.items ? this.orderItemGetMapper.toDtos(dbModel.items, additionalData.itemsAdditionalData) : undefined
        }
    }

    toDtos(dbModels: OrderModel[], additionalData: OrderGetDtoModelAdditionalData[]): OrderGetOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

}

export class OrderCreateMapper implements IOrderCreateMapper {

    constructor(
        protected orderItemCreateMapper: IOrderItemWithOrderCreateMapper
    ) {}

    toDto(dbModel: OrderModel, additionalData: OrderCreateDtoModelAdditionalData): OrderCreateOutputDTO {
        return {
            id: Number(dbModel.id),
            customerId: Number(dbModel.customerId),
            courierId: dbModel.courierId ? Number(dbModel.courierId) : undefined,
            restaurantId: Number(dbModel.restaurantId),
            status: dbModel.status,
            promocode: additionalData.promocode,
            createdAt: dbModel.createdAt.toString(),
            deliveryAcceptedAt: dbModel.deliveryAcceptedAt?.toString(),
            supposedDeliveryTime: dbModel.supposedDeliveryTime.toString(),
            actualDeliveryTime: dbModel.actualDeliveryTime?.toString(),
            deliveryFinishedAt: dbModel.deliveryFinishedAt?.toString(),
            totalPrice: dbModel.totalPrice,
            decountedPrice: dbModel.decountedPrice,
            items: dbModel.items ? this.orderItemCreateMapper.toDtos(dbModel.items, additionalData.itemsAdditionalData) : undefined
        }
    }

    toDtos(dbModels: OrderModel[], additionalData: OrderCreateDtoModelAdditionalData[]): OrderCreateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

    toDbModel(dtoModel: OrderCreateInputDTO, additionalData: OrderCreateDbModelAdditionalData): OrderCreateInput {
        return {
            customerId: BigInt(additionalData.customerId),
            restaurantId: BigInt(dtoModel.restaurantId),
            promocodeId: additionalData.promocodeId ? BigInt(additionalData.promocodeId) : undefined,
            supposedDeliveryTime: additionalData.supposedDeliveryTime,
            totalPrice: additionalData.totalPrice,
            decountedPrice: additionalData.decountedPrice,
            create: {
                items: this.orderItemCreateMapper.toDbModels(dtoModel.items, additionalData.itemsAdditionalData)
            }
        }
    }

    toDbModels(dtoModels: OrderCreateInputDTO[], additionalData: OrderCreateDbModelAdditionalData[]): OrderCreateInput[] {
        return mapManyModels(dtoModels, this.toDbModel, additionalData)
    }

}