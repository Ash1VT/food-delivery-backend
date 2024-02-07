import { OrderItemCreateInputDTO, OrderItemCreateOutputDTO, OrderItemGetOutputDTO } from "../../dto/orderItem";
import { OrderItemCreateInput, OrderItemModel, OrderItemWithOrderCreateInput } from "../../models/orderItem";
import { OrderItemAdditionalData, OrderItemWithOrderAdditionalData } from "../additionalData";
import { IOrderItemGetMapper, IOrderItemCreateMapper } from "../interfaces/orderItem";

export class OrderItemGetMapper implements IOrderItemGetMapper {

    toDto(dbModel: OrderItemModel): OrderItemGetOutputDTO {
        return {
            id: dbModel.id,
            orderId: dbModel.orderId,
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
            id: dbModel.id,
            orderId: dbModel.orderId,
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
            orderId: additionalData.orderId,
            quantity: dtoModel.quantity
        }
    }

    toDbModelWithOrder(dtoModel: OrderItemCreateInputDTO, additionalData: OrderItemWithOrderAdditionalData): OrderItemWithOrderCreateInput {
        return {
            menuItemName: additionalData.menuItemName,
            menuItemImageUrl: additionalData.menuItemImageUrl,
            menuItemPrice: additionalData.menuItemPrice,
            quantity: dtoModel.quantity
        }
    }

}