import { OrderCreateOutputDTO, OrderCreateInputDTO, OrderGetOutputDTO } from "../../../dto/order";
import { OrderCreateInput, OrderModel } from "../../../models/order";
import { OrderCreateDbModelAdditionalData, OrderCreateDtoModelAdditionalData, OrderGetDtoModelAdditionalData } from "../../types/additionalData";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";


export interface IOrderCreateMapper extends DatabaseToDtoMapper<OrderModel, OrderCreateOutputDTO, OrderCreateDtoModelAdditionalData>,
                                              DtoToDatabaseMapper<OrderCreateInputDTO, OrderCreateInput, OrderCreateDbModelAdditionalData> {}

// export interface IOrderUpdateMapper extends IDatabaseToDtoMapper<OrderModel, OrderUpdateOutputDTO>,
//                                               IDtoToDatabaseMapper<OrderUpdateInputDTO, OrderModel>,
//                                               IObjectToDtoMapper<OrderUpdateInputDTO> {}

export interface IOrderGetMapper extends DatabaseToDtoMapper<OrderModel, OrderGetOutputDTO, OrderGetDtoModelAdditionalData> {}