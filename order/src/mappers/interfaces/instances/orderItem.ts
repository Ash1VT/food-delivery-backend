import { OrderItemCreateOutputDTO, OrderItemCreateInputDTO, OrderItemGetOutputDTO } from "../../../dto/orderItem";
import { OrderItemCreateInput, OrderItemModel, OrderItemWithOrderCreateInput } from "../../../models/orderItem";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";
import IObjectToDtoMapper from "../ObjectToDtoMapper";


export interface IOrderItemCreateMapper extends DatabaseToDtoMapper<OrderItemModel, OrderItemCreateOutputDTO>,
                                              DtoToDatabaseMapper<OrderItemCreateInputDTO, OrderItemWithOrderCreateInput, OrderItemCreateAdditionalData>,
                                              IObjectToDtoMapper<OrderItemCreateInputDTO> {}

export interface IOrderItemGetMapper extends DatabaseToDtoMapper<OrderItemModel, OrderItemGetOutputDTO> {}