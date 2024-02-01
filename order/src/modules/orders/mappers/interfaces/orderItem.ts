import { OrderItemWithOrderAdditionalData } from './../additionalData';
import { OrderItemWithOrderCreateInput } from './../../models/orderItem';
import { OrderItemCreateInputDTO, OrderItemGetOutputDTO } from "../../dto/orderItem";
import { OrderItemCreateInput, OrderItemModel } from "../../models/orderItem";
import { OrderItemAdditionalData } from "../additionalData";

export interface IOrderItemGetMapper {
    toDto(dbModel: OrderItemModel): OrderItemGetOutputDTO
}

export interface IOrderItemCreateMapper {
    toDto(dbModel: OrderItemModel): OrderItemGetOutputDTO
    toDbModel(dtoModel: OrderItemCreateInputDTO, additionalData: OrderItemAdditionalData): OrderItemCreateInput
    toDbModelWithOrder(dtoModel: OrderItemCreateInputDTO, additionalData: OrderItemWithOrderAdditionalData): OrderItemWithOrderCreateInput
}