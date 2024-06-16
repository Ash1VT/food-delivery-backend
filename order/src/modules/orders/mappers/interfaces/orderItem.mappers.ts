import { OrderItemWithOrderAdditionalData } from '../additionalData';
import { OrderItemUpdateInput, OrderItemWithOrderCreateInput } from '../../models/orderItem.models';
import { OrderItemCreateInputDto, OrderItemGetOutputDto, OrderItemUpdateInputDto, OrderItemUpdateOutputDto } from "../../dto/orderItem.dto";
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
    toDbModel(dtoModel: OrderItemUpdateInputDto): OrderItemUpdateInput
    toDto(dbModel: OrderItemModel): OrderItemUpdateOutputDto
}