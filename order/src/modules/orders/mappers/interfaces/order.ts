import { OrderCreateOutputDTO, OrderCreateInputDTO, OrderGetOutputDTO } from "../../dto/order";
import { OrderCreateInput, OrderModel } from "../../models/order";
import { OrderCreateDtoModelAdditionalData, OrderCreateDbModelAdditionalData, OrderGetDtoModelAdditionalData } from "../additionalData";
import IDatabaseToDtoMapper from "@src/base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "@src/base/mappers/interfaces/IDtoToDatabaseMapper";

export interface IOrderCreateMapper extends IDatabaseToDtoMapper<OrderModel, OrderCreateOutputDTO, OrderCreateDtoModelAdditionalData>,
                                              IDtoToDatabaseMapper<OrderCreateInputDTO, OrderCreateInput, OrderCreateDbModelAdditionalData> {}

// export interface IOrderUpdateMapper extends IDatabaseToDtoMapper<OrderModel, OrderUpdateOutputDTO>,
//                                               IDtoToDatabaseMapper<OrderUpdateInputDTO, OrderModel>,
//                                               IObjectToDtoMapper<OrderUpdateInputDTO> {}

export interface IOrderGetMapper extends IDatabaseToDtoMapper<OrderModel, OrderGetOutputDTO, OrderGetDtoModelAdditionalData> {}