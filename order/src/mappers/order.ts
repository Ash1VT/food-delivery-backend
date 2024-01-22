import { OrderCreateInputDTO, OrderCreateOutputDTO, OrderGetOutputDTO } from "../dto/order";
import { OrderCreateInput, OrderModel } from "../models/order";
import { IOrderGetMapper, IOrderCreateMapper } from "./interfaces/instances/order";
import { OrderItemGetMapper } from "./orderItem";
import { OrderCreateAdditionalData } from "./types/additionalData";

export class OrderGetMapper implements IOrderGetMapper {

    constructor(
        protected orderItemGetMapper: OrderItemGetMapper
    ) {}

    toDto(dbModel: OrderModel): OrderGetOutputDTO {
        return {
            id: Number(dbModel.id),
            customerId: Number(dbModel.customerId),
            courierId: Number(dbModel.courierId),
            restaurantId: Number(dbModel.restaurantId),
            status: dbModel.status,
            createdAt: dbModel.createdAt.toString(),
            supposedDeliveryTime: dbModel.supposedDeliveryTime.toString(),
            totalPrice: dbModel.totalPrice,
            decountedPrice: dbModel.decountedPrice,
            items: dbModel.items ? this.orderItemGetMapper.toDtos(dbModel.items) : undefined
        }
    }

    toDtos(dbModels: OrderModel[]): OrderGetOutputDTO[] {
        return dbModels.map((dbModel) => this.toDto(dbModel))
    }

}

export class OrderCreateMapper implements IOrderCreateMapper {

    toDto(dbModel: OrderModel): OrderCreateOutputDTO {
        throw new Error("Method not implemented.");
    }

    toDtos(dbModels: OrderModel[]): OrderCreateOutputDTO[] {
        throw new Error("Method not implemented.");
    }

    toDbModel(dtoModel: OrderCreateInputDTO, additionalData: OrderCreateAdditionalData): OrderCreateInput {
        return {
            customerId: BigInt(additionalData.customerId),
            restaurantId: BigInt(dtoModel.restaurantId),
            promocodeId: additionalData.promocodeId ? BigInt(additionalData.promocodeId) : undefined,
            supposedDeliveryTime: additionalData.supposedDeliveryTime,
            totalPrice: additionalData.totalPrice,
            decountedPrice: additionalData.decountedPrice
        }
    }

    toDbModels(dtoModels: OrderCreateInputDTO[], additionalData?: OrderCreateAdditionalData[]): OrderCreateInput[] {
        throw new Error("Method not implemented.");
    }
    
    parse(data: any): OrderCreateInputDTO {
        throw new Error("Method not implemented.");
    }

}
