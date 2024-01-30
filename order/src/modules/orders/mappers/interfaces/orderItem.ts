import { OrderCreateInputDTO } from "../../dto/order";
import { OrderItemCreateOutputDTO, OrderItemCreateInputDTO, OrderItemGetOutputDTO, OrderItemWithOrderCreateInputDTO, OrderItemWithOrderCreateOutputDTO } from "../../dto/orderItem";
import { OrderItemCreateInput, OrderItemModel, OrderItemWithOrderCreateInput } from "../../models/orderItem";
import { OrderItemAdditionalData } from "../additionalData";

export interface IOrderItemGetMapper {
    toDto(dbModel: OrderItemModel): OrderItemGetOutputDTO
}

export interface IOrderItemCreateMapper {
    toDto(dbModel: OrderItemModel): OrderItemGetOutputDTO
    toDbModel(dtoModel: OrderItemCreateInputDTO, additionalData: OrderItemAdditionalData): OrderItemCreateInput
}

export interface IOrderItemWithOrderCreateMapper {
    toDto(dbModel: OrderItemModel): OrderItemWithOrderCreateOutputDTO
    toDbModel(dtoModel: OrderItemWithOrderCreateInputDTO, additionalData: OrderItemAdditionalData): OrderItemWithOrderCreateInput
}