import { OrderCreateOutputDTO, OrderCreateInputDTO, OrderGetOutputDTO } from "../../dto/order";
import { OrderCreateInput, OrderModel } from "../../models/order";
import IDatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";
import { OrderCreateDtoModelAdditionalData, OrderCreateDbModelAdditionalData, OrderGetDtoModelAdditionalData } from "../additionalData";


export interface IOrderCreateMapper extends IDatabaseToDtoMapper<OrderModel, OrderCreateOutputDTO, OrderCreateDtoModelAdditionalData>,
                                              IDtoToDatabaseMapper<OrderCreateInputDTO, OrderCreateInput, OrderCreateDbModelAdditionalData> {}

// export interface IOrderUpdateMapper extends IDatabaseToDtoMapper<OrderModel, OrderUpdateOutputDTO>,
//                                               IDtoToDatabaseMapper<OrderUpdateInputDTO, OrderModel>,
//                                               IObjectToDtoMapper<OrderUpdateInputDTO> {}

export interface IOrderGetMapper extends IDatabaseToDtoMapper<OrderModel, OrderGetOutputDTO, OrderGetDtoModelAdditionalData> {}