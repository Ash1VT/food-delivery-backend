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
            menuItemName: dbModel.menuItemName,
            menuItemImageUrl: dbModel.menuItemImageUrl,
            menuItemPrice: dbModel.menuItemPrice,
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
            menuItemName: dbModel.menuItemName,
            menuItemImageUrl: dbModel.menuItemImageUrl,
            menuItemPrice: dbModel.menuItemPrice,
            quantity: dbModel.quantity
        }
    }

    toDtos(dbModels: OrderItemModel[], additionalData: OrderItemCreateDtoModelAdditionalData[]): OrderItemCreateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

    toDbModel(dtoModel: OrderItemCreateInputDTO, additionalData: OrderItemCreateDbModelAdditionalData): OrderItemCreateInput {
        return {
            menuItemName: additionalData.menuItemName,
            menuItemImageUrl: additionalData.menuItemImageUrl,
            menuItemPrice: additionalData.menuItemPrice,
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
            menuItemName: dbModel.menuItemName,
            menuItemImageUrl: dbModel.menuItemImageUrl,
            menuItemPrice: dbModel.menuItemPrice,
            quantity: dbModel.quantity
        }
    }

    toDtos(dbModels: OrderItemModel[], additionalData: OrderItemCreateDtoModelAdditionalData[]): OrderItemWithOrderCreateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

    toDbModel(dtoModel: OrderItemWithOrderCreateInputDTO, additionalData: OrderItemCreateDbModelAdditionalData): OrderItemWithOrderCreateInput {
        return {
            menuItemName: additionalData.menuItemName,
            menuItemImageUrl: additionalData.menuItemImageUrl,
            menuItemPrice: additionalData.menuItemPrice,
            quantity: dtoModel.quantity
        }
    }

    toDbModels(dtoModels: OrderItemWithOrderCreateInputDTO[], additionalData: OrderItemCreateDbModelAdditionalData[]): OrderItemWithOrderCreateInput[] {
        return mapManyModels(dtoModels, this.toDbModel, additionalData)
    }

}