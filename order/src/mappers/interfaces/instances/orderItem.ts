import { OrderItemCreateOutputDTO, OrderItemCreateInputDTO, OrderItemGetOutputDTO, OrderItemWithOrderCreateInputDTO, OrderItemWithOrderCreateOutputDTO } from "../../../dto/orderItem";
import { OrderItemCreateInput, OrderItemModel, OrderItemWithOrderCreateInput } from "../../../models/orderItem";
import { OrderItemCreateDbModelAdditionalData, OrderItemCreateDtoModelAdditionalData, OrderItemGetDtoModelAdditionalData } from "../../types/additionalData";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";


export interface IOrderItemCreateMapper extends DatabaseToDtoMapper<OrderItemModel, OrderItemCreateOutputDTO, OrderItemCreateDtoModelAdditionalData>,
                                              DtoToDatabaseMapper<OrderItemCreateInputDTO, OrderItemCreateInput, OrderItemCreateDbModelAdditionalData> {}

export interface IOrderItemWithOrderCreateMapper extends DatabaseToDtoMapper<OrderItemModel, OrderItemWithOrderCreateOutputDTO, OrderItemCreateDtoModelAdditionalData>,
                                                         DtoToDatabaseMapper<OrderItemWithOrderCreateInputDTO, OrderItemWithOrderCreateInput, OrderItemCreateDbModelAdditionalData> {}

export interface IOrderItemGetMapper extends DatabaseToDtoMapper<OrderItemModel, OrderItemGetOutputDTO, OrderItemGetDtoModelAdditionalData> {}