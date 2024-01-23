import { OrderCreateOutputDTO, OrderCreateInputDTO, OrderGetOutputDTO } from "../../dto/order";
import { OrderCreateInput, OrderModel } from "../../models/order";
import { OrderCreateDbModelAdditionalData, OrderCreateDtoModelAdditionalData, OrderGetDtoModelAdditionalData } from "../../../../mappers/types/additionalData";
import DatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";


export interface IOrderCreateMapper extends DatabaseToDtoMapper<OrderModel, OrderCreateOutputDTO, OrderCreateDtoModelAdditionalData>,
                                              DtoToDatabaseMapper<OrderCreateInputDTO, OrderCreateInput, OrderCreateDbModelAdditionalData> {}

// export interface IOrderUpdateMapper extends IDatabaseToDtoMapper<OrderModel, OrderUpdateOutputDTO>,
//                                               IDtoToDatabaseMapper<OrderUpdateInputDTO, OrderModel>,
//                                               IObjectToDtoMapper<OrderUpdateInputDTO> {}

export interface IOrderGetMapper extends DatabaseToDtoMapper<OrderModel, OrderGetOutputDTO, OrderGetDtoModelAdditionalData> {}