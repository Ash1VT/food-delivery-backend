import { OrderCreateOutputDTO, OrderCreateInputDTO, OrderGetOutputDTO } from "../../../dto/order";
import { OrderCreateInput, OrderModel } from "../../../models/order";
import { OrderCreateAdditionalData } from "../../types/additionalData";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";
import IObjectToDtoMapper from "../ObjectToDtoMapper";


export interface IOrderCreateMapper extends DatabaseToDtoMapper<OrderModel, OrderCreateOutputDTO>,
                                              DtoToDatabaseMapper<OrderCreateInputDTO, OrderCreateInput, OrderCreateAdditionalData>,
                                              IObjectToDtoMapper<OrderCreateInputDTO> {}

// export interface IOrderUpdateMapper extends IDatabaseToDtoMapper<OrderModel, OrderUpdateOutputDTO>,
//                                               IDtoToDatabaseMapper<OrderUpdateInputDTO, OrderModel>,
//                                               IObjectToDtoMapper<OrderUpdateInputDTO> {}

export interface IOrderGetMapper extends DatabaseToDtoMapper<OrderModel, OrderGetOutputDTO> {}