import { OrderItemCreateInputDTO, OrderItemCreateOutputDTO, OrderItemGetOutputDTO, OrderItemWithOrderCreateInputDTO, OrderItemWithOrderCreateOutputDTO } from "../../dto/orderItem";
import { OrderItemCreateInput, OrderItemModel, OrderItemWithOrderCreateInput } from "../../models/orderItem";
import { OrderItemAdditionalData } from "../additionalData";
import { IOrderItemGetMapper, IOrderItemCreateMapper, IOrderItemWithOrderCreateMapper } from "../interfaces/orderItem";

export class OrderItemGetMapper implements IOrderItemGetMapper {

    toDto(dbModel: OrderItemModel): OrderItemGetOutputDTO {
        return {
            id: Number(dbModel.id),
            orderId: Number(dbModel.orderId),
            menuItemName: dbModel.menuItemName,
            menuItemImageUrl: dbModel.menuItemImageUrl,
            menuItemPrice: dbModel.menuItemPrice,
            quantity: dbModel.quantity
        }
    }

}

export class OrderItemCreateMapper implements IOrderItemCreateMapper {

    toDto(dbModel: OrderItemModel): OrderItemCreateOutputDTO {
        return {
            id: Number(dbModel.id),
            orderId: Number(dbModel.orderId),
            menuItemName: dbModel.menuItemName,
            menuItemImageUrl: dbModel.menuItemImageUrl,
            menuItemPrice: dbModel.menuItemPrice,
            quantity: dbModel.quantity
        }
    }

    toDbModel(dtoModel: OrderItemCreateInputDTO, additionalData: OrderItemAdditionalData): OrderItemCreateInput {
        return {
            menuItemName: additionalData.menuItemName,
            menuItemImageUrl: additionalData.menuItemImageUrl,
            menuItemPrice: additionalData.menuItemPrice,
            orderId: BigInt(dtoModel.orderId),
            quantity: dtoModel.quantity
        }
    }

}


export class OrderItemWithOrderCreateMapper implements IOrderItemWithOrderCreateMapper {

    toDto(dbModel: OrderItemModel): OrderItemWithOrderCreateOutputDTO {
        return {
            id: Number(dbModel.id),
            menuItemName: dbModel.menuItemName,
            menuItemImageUrl: dbModel.menuItemImageUrl,
            menuItemPrice: dbModel.menuItemPrice,
            quantity: dbModel.quantity
        }
    }

    toDbModel(dtoModel: OrderItemWithOrderCreateInputDTO, additionalData: OrderItemAdditionalData): OrderItemWithOrderCreateInput {
        return {
            menuItemName: additionalData.menuItemName,
            menuItemImageUrl: additionalData.menuItemImageUrl,
            menuItemPrice: additionalData.menuItemPrice,
            quantity: dtoModel.quantity
        }
    }

}