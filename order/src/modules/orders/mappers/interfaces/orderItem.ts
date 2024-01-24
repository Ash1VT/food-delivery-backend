import { OrderItemCreateOutputDTO, OrderItemCreateInputDTO, OrderItemGetOutputDTO, OrderItemWithOrderCreateInputDTO, OrderItemWithOrderCreateOutputDTO } from "../../dto/orderItem";
import { OrderItemCreateInput, OrderItemModel, OrderItemWithOrderCreateInput } from "../../models/orderItem";
import { OrderItemCreateDtoModelAdditionalData, OrderItemCreateDbModelAdditionalData, OrderItemGetDtoModelAdditionalData } from "../additionalData";
import IDatabaseToDtoMapper from "@src/base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "@src/base/mappers/interfaces/IDtoToDatabaseMapper";

export interface IOrderItemCreateMapper extends IDatabaseToDtoMapper<OrderItemModel, OrderItemCreateOutputDTO, OrderItemCreateDtoModelAdditionalData>,
                                              IDtoToDatabaseMapper<OrderItemCreateInputDTO, OrderItemCreateInput, OrderItemCreateDbModelAdditionalData> {}

export interface IOrderItemWithOrderCreateMapper extends IDatabaseToDtoMapper<OrderItemModel, OrderItemWithOrderCreateOutputDTO, OrderItemCreateDtoModelAdditionalData>,
                                                         IDtoToDatabaseMapper<OrderItemWithOrderCreateInputDTO, OrderItemWithOrderCreateInput, OrderItemCreateDbModelAdditionalData> {}

export interface IOrderItemGetMapper extends IDatabaseToDtoMapper<OrderItemModel, OrderItemGetOutputDTO, OrderItemGetDtoModelAdditionalData> {}