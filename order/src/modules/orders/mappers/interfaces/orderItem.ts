import { OrderItemCreateOutputDTO, OrderItemCreateInputDTO, OrderItemGetOutputDTO, OrderItemWithOrderCreateInputDTO, OrderItemWithOrderCreateOutputDTO } from "../../dto/orderItem";
import { OrderItemCreateInput, OrderItemModel, OrderItemWithOrderCreateInput } from "../../models/orderItem";
import DatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";
import { OrderItemCreateDtoModelAdditionalData, OrderItemCreateDbModelAdditionalData, OrderItemGetDtoModelAdditionalData } from "../additionalData";


export interface IOrderItemCreateMapper extends DatabaseToDtoMapper<OrderItemModel, OrderItemCreateOutputDTO, OrderItemCreateDtoModelAdditionalData>,
                                              DtoToDatabaseMapper<OrderItemCreateInputDTO, OrderItemCreateInput, OrderItemCreateDbModelAdditionalData> {}

export interface IOrderItemWithOrderCreateMapper extends DatabaseToDtoMapper<OrderItemModel, OrderItemWithOrderCreateOutputDTO, OrderItemCreateDtoModelAdditionalData>,
                                                         DtoToDatabaseMapper<OrderItemWithOrderCreateInputDTO, OrderItemWithOrderCreateInput, OrderItemCreateDbModelAdditionalData> {}

export interface IOrderItemGetMapper extends DatabaseToDtoMapper<OrderItemModel, OrderItemGetOutputDTO, OrderItemGetDtoModelAdditionalData> {}