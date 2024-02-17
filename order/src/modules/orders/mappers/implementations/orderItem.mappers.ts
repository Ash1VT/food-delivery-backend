import { OrderItemCreateInputDto, OrderItemCreateOutputDto, OrderItemGetOutputDto } from "../../dto/orderItem.dto";
import { OrderItemCreateInput, OrderItemModel, OrderItemWithOrderCreateInput } from "../../models/orderItem.models";
import { OrderItemAdditionalData, OrderItemWithOrderAdditionalData } from "../additionalData";
import { IOrderItemGetMapper, IOrderItemCreateMapper } from "../interfaces/orderItem.mappers";

export class OrderItemGetMapper implements IOrderItemGetMapper {

    toDto(dbModel: OrderItemModel): OrderItemGetOutputDto {
        return {
            id: dbModel.id.toString(),
            orderId: dbModel.orderId.toString(),
            menuItemName: dbModel.menuItemName,
            menuItemImageUrl: dbModel.menuItemImageUrl,
            menuItemPrice: dbModel.menuItemPrice,
            quantity: dbModel.quantity
        }
    }

}

export class OrderItemCreateMapper implements IOrderItemCreateMapper {

    toDto(dbModel: OrderItemModel): OrderItemCreateOutputDto {
        return {
            id: dbModel.id.toString(),
            orderId: dbModel.orderId.toString(),
            menuItemName: dbModel.menuItemName,
            menuItemImageUrl: dbModel.menuItemImageUrl,
            menuItemPrice: dbModel.menuItemPrice,
            quantity: dbModel.quantity
        }
    }

    toDbModel(dtoModel: OrderItemCreateInputDto, additionalData: OrderItemAdditionalData): OrderItemCreateInput {
        return {
            menuItemName: additionalData.menuItemName,
            menuItemImageUrl: additionalData.menuItemImageUrl,
            menuItemPrice: additionalData.menuItemPrice,
            orderId: additionalData.orderId,
            quantity: dtoModel.quantity
        }
    }

    toDbModelWithOrder(dtoModel: OrderItemCreateInputDto, additionalData: OrderItemWithOrderAdditionalData): OrderItemWithOrderCreateInput {
        return {
            menuItemName: additionalData.menuItemName,
            menuItemImageUrl: additionalData.menuItemImageUrl,
            menuItemPrice: additionalData.menuItemPrice,
            quantity: dtoModel.quantity
        }
    }

}