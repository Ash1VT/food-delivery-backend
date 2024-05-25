import { OrderItemWithOrderAdditionalData } from '../additionalData';
import { OrderItemWithOrderCreateInput } from '../../models/orderItem.models';
import { OrderItemCreateInputDto, OrderItemGetOutputDto, OrderItemUpdateOutputDto } from "../../dto/orderItem.dto";
import { OrderItemCreateInput, OrderItemModel } from "../../models/orderItem.models";
import { OrderItemAdditionalData } from "../additionalData";

export interface IOrderItemGetMapper {
    toDto(dbModel: OrderItemModel): OrderItemGetOutputDto
}

export interface IOrderItemCreateMapper {
    toDto(dbModel: OrderItemModel): OrderItemGetOutputDto
    toDbModel(dtoModel: OrderItemCreateInputDto, additionalData: OrderItemAdditionalData): OrderItemCreateInput
    toDbModelWithOrder(dtoModel: OrderItemCreateInputDto, additionalData: OrderItemWithOrderAdditionalData): OrderItemWithOrderCreateInput
}

export interface IOrderItemUpdateMapper {
    toDto(dbModel: OrderItemModel): OrderItemUpdateOutputDto
}