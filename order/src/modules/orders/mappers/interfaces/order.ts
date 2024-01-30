import { OrderCreateOutputDTO, OrderCreateInputDTO, OrderGetOutputDTO } from "../../dto/order";
import { OrderCreateInput, OrderModel } from "../../models/order";
import { OrderAdditionalData } from "../additionalData";
export interface IOrderGetMapper {
    toDto(dbModel: OrderModel): OrderGetOutputDTO
}

export interface IOrderCreateMapper {
    toDto(dbModel: OrderModel): OrderCreateOutputDTO
    toDbModel(dtoModel: OrderCreateInputDTO, additionalData: OrderAdditionalData): OrderCreateInput
}

// export interface IOrderUpdateMapper extends IDatabaseToDtoMapper<OrderModel, OrderUpdateOutputDTO>,
//                                               IDtoToDatabaseMapper<OrderUpdateInputDTO, OrderModel>,
//                                               IObjectToDtoMapper<OrderUpdateInputDTO> {}
