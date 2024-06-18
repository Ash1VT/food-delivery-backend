import getLogger from "@src/core/setup/logger";
import { OrderItemCreateInputDto, OrderItemCreateOutputDto, OrderItemGetOutputDto, OrderItemUpdateInputDto, OrderItemUpdateOutputDto } from "../../dto/orderItem.dto";
import { OrderItemCreateInput, OrderItemModel, OrderItemUpdateInput, OrderItemWithOrderCreateInput } from "../../models/orderItem.models";
import { OrderItemAdditionalData, OrderItemWithOrderAdditionalData } from "../additionalData";
import { IOrderItemGetMapper, IOrderItemCreateMapper, IOrderItemUpdateMapper } from "../interfaces/orderItem.mappers";


const logger = getLogger(module)

export class OrderItemGetMapper implements IOrderItemGetMapper {

    toDto(dbModel: OrderItemModel): OrderItemGetOutputDto {
        const data = {
            id: dbModel.id.toString(),
            orderId: dbModel.orderId.toString(),
            menuItemName: dbModel.menuItemName,
            menuItemImageUrl: dbModel.menuItemImageUrl,
            menuItemPrice: dbModel.menuItemPrice,
            quantity: dbModel.quantity
        }

        logger.debug(`Mapped database OrderItemModel with id=${dbModel.id} to OrderItemGetOutputDto`)

        return data
    }

}

export class OrderItemCreateMapper implements IOrderItemCreateMapper {

    toDto(dbModel: OrderItemModel): OrderItemCreateOutputDto {
        const data = {
            id: dbModel.id.toString(),
            orderId: dbModel.orderId.toString(),
            menuItemName: dbModel.menuItemName,
            menuItemImageUrl: dbModel.menuItemImageUrl,
            menuItemPrice: dbModel.menuItemPrice,
            quantity: dbModel.quantity
        }

        logger.debug(`Mapped database OrderItemModel with id=${dbModel.id} to OrderItemCreateOutputDto`)

        return data
    }

    toDbModel(dtoModel: OrderItemCreateInputDto, additionalData: OrderItemAdditionalData): OrderItemCreateInput {
        const data = {
            menuItemName: additionalData.menuItemName,
            menuItemImageUrl: additionalData.menuItemImageUrl,
            menuItemPrice: additionalData.menuItemPrice,
            orderId: additionalData.orderId,
            quantity: dtoModel.quantity
        }

        logger.debug(`Mapped OrderItemCreateInputDto to database OrderItemCreateInput`)

        return data
    }

    toDbModelWithOrder(dtoModel: OrderItemCreateInputDto, additionalData: OrderItemWithOrderAdditionalData): OrderItemWithOrderCreateInput {
        const data =  {
            menuItemName: additionalData.menuItemName,
            menuItemImageUrl: additionalData.menuItemImageUrl,
            menuItemPrice: additionalData.menuItemPrice,
            quantity: dtoModel.quantity
        }

        logger.debug(`Mapped OrderItemCreateInputDto to database OrderItemWithOrderCreateInput`)

        return data
    }

}

export class OrderItemUpdateMapper implements IOrderItemUpdateMapper {

    toDbModel(dtoModel: OrderItemUpdateInputDto): OrderItemUpdateInput {
        const data = {
            quantity: dtoModel.quantity
        }

        logger.debug(`Mapped OrderItemUpdateInputDto to database OrderItemUpdateInput`)

        return data
    }
    
    toDto(dbModel: OrderItemModel): OrderItemUpdateOutputDto {
        const data = {
            id: dbModel.id.toString(),
            orderId: dbModel.orderId.toString(),
            menuItemName: dbModel.menuItemName,
            menuItemImageUrl: dbModel.menuItemImageUrl,
            menuItemPrice: dbModel.menuItemPrice,
            quantity: dbModel.quantity
        }

        logger.debug(`Mapped database OrderItemModel with id=${dbModel.id} to OrderItemUpdateOutputDto`)

        return data
    }

}