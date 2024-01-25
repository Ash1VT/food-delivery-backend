import { OrderItemCreateInputDTO, OrderItemCreateOutputDTO, OrderItemGetOutputDTO, OrderItemWithOrderCreateInputDTO, OrderItemWithOrderCreateOutputDTO } from "../../dto/orderItem";
import { OrderItemCreateInput, OrderItemModel, OrderItemWithOrderCreateInput } from "../../models/orderItem";
import { IOrderItemGetMapper, IOrderItemCreateMapper, IOrderItemWithOrderCreateMapper } from "../interfaces/orderItem";
import { OrderItemGetDtoModelAdditionalData, OrderItemCreateDtoModelAdditionalData, OrderItemCreateDbModelAdditionalData } from "../additionalData";
import mapManyModels from "@src/utils/mapManyModels";

export class OrderItemGetMapper implements IOrderItemGetMapper {

    toDto(dbModel: OrderItemModel, additionalData: OrderItemGetDtoModelAdditionalData): OrderItemGetOutputDTO {
        return {
            id: Number(dbModel.id),
            orderId: Number(dbModel.orderId),
            menuItemId: Number(dbModel.menuItemId),
            quantity: dbModel.quantity
        }
    }

    toDtos(dbModels: OrderItemModel[], additionalData: OrderItemGetDtoModelAdditionalData[]): OrderItemGetOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

}

export class OrderItemCreateMapper implements IOrderItemCreateMapper {

    toDto(dbModel: OrderItemModel, additionalData: OrderItemCreateDtoModelAdditionalData): OrderItemCreateOutputDTO {
        return {
            id: Number(dbModel.id),
            orderId: Number(dbModel.orderId),
            menuItemId: Number(dbModel.menuItemId),
            quantity: dbModel.quantity
        }
    }

    toDtos(dbModels: OrderItemModel[], additionalData: OrderItemCreateDtoModelAdditionalData[]): OrderItemCreateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

    toDbModel(dtoModel: OrderItemCreateInputDTO, additionalData: OrderItemCreateDbModelAdditionalData): OrderItemCreateInput {
        return {
            menuItemId: BigInt(dtoModel.menuItemId),
            orderId: BigInt(dtoModel.orderId),
            quantity: dtoModel.quantity
        }
    }

    toDbModels(dtoModels: OrderItemCreateInputDTO[], additionalData: OrderItemCreateDbModelAdditionalData[]): OrderItemCreateInput[] {
        return mapManyModels(dtoModels, this.toDbModel, additionalData)
    }

}


export class OrderItemWithOrderCreateMapper implements IOrderItemWithOrderCreateMapper {

    toDto(dbModel: OrderItemModel, additionalData: OrderItemCreateDtoModelAdditionalData): OrderItemWithOrderCreateOutputDTO {
        return {
            id: Number(dbModel.id),
            menuItemId: Number(dbModel.menuItemId),
            quantity: dbModel.quantity
        }
    }

    toDtos(dbModels: OrderItemModel[], additionalData: OrderItemCreateDtoModelAdditionalData[]): OrderItemWithOrderCreateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

    toDbModel(dtoModel: OrderItemWithOrderCreateInputDTO, additionalData: OrderItemCreateDbModelAdditionalData): OrderItemWithOrderCreateInput {
        return {
            menuItemId: BigInt(dtoModel.menuItemId),
            quantity: dtoModel.quantity
        }
    }

    toDbModels(dtoModels: OrderItemWithOrderCreateInputDTO[], additionalData: OrderItemCreateDbModelAdditionalData[]): OrderItemWithOrderCreateInput[] {
        return mapManyModels(dtoModels, this.toDbModel, additionalData)
    }

}