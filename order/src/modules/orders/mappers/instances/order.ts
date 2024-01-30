import { mapManyModels, mapManyModelsWithAdditionalData } from "@src/utils/mapManyModels";
import { OrderCreateInputDTO, OrderCreateOutputDTO, OrderGetOutputDTO } from "../../dto/order";
import { OrderCreateInput, OrderModel } from "../../models/order";
import { OrderAdditionalData } from "../additionalData";
import { IOrderGetMapper, IOrderCreateMapper } from "../interfaces/order";
import { IOrderItemGetMapper, IOrderItemWithOrderCreateMapper } from "../interfaces/orderItem";

export class OrderGetMapper implements IOrderGetMapper {

    constructor(
        protected orderItemGetMapper: IOrderItemGetMapper
    ) {}

    toDto(dbModel: OrderModel): OrderGetOutputDTO {
        return {
            id: Number(dbModel.id),
            customerId: Number(dbModel.customerId),
            courierId: Number(dbModel.courierId),
            restaurantId: Number(dbModel.restaurantId),
            promocodeName: dbModel.promocodeName ? dbModel.promocodeName : undefined,
            promocodeDiscount: dbModel.promocodeDiscount ? dbModel.promocodeDiscount : undefined,
            status: dbModel.status,
            createdAt: dbModel.createdAt.toString(),
            supposedDeliveryTime: dbModel.supposedDeliveryTime.toString(),
            totalPrice: dbModel.totalPrice,
            decountedPrice: dbModel.decountedPrice,
            items: dbModel.items ? mapManyModels(dbModel.items, this.orderItemGetMapper.toDto) : undefined
        }
    }

}

export class OrderCreateMapper implements IOrderCreateMapper {

    constructor(
        protected orderItemWithOrderCreateMapper: IOrderItemWithOrderCreateMapper
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
            createdAt: dbModel.createdAt.toString(),
            deliveryAcceptedAt: dbModel.deliveryAcceptedAt?.toString(),
            supposedDeliveryTime: dbModel.supposedDeliveryTime.toString(),
            actualDeliveryTime: dbModel.actualDeliveryTime?.toString(),
            deliveryFinishedAt: dbModel.deliveryFinishedAt?.toString(),
            totalPrice: dbModel.totalPrice,
            decountedPrice: dbModel.decountedPrice,
            items: dbModel.items ? mapManyModels(dbModel.items, this.orderItemWithOrderCreateMapper.toDto) : undefined
        }
    }

    toDbModel(dtoModel: OrderCreateInputDTO, additionalData: OrderAdditionalData): OrderCreateInput {
        return {
            customerId: BigInt(additionalData.customerId),
            restaurantId: BigInt(dtoModel.restaurantId),
            promocodeName: additionalData.promocodeName,
            promocodeDiscount: additionalData.promocodeDiscount,
            supposedDeliveryTime: additionalData.supposedDeliveryTime,
            totalPrice: additionalData.totalPrice,
            decountedPrice: additionalData.decountedPrice,
            create: {
                items: mapManyModelsWithAdditionalData(dtoModel.items, this.orderItemWithOrderCreateMapper.toDbModel, additionalData.itemsAdditionalData)
            }
        }
    }

}