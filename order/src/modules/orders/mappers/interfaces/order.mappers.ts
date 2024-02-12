import { OrderCreateOutputDto, OrderCreateInputDto, OrderGetOutputDto } from "../../dto/order.dto";
import { OrderCreateInput, OrderModel } from "../../models/order.models";
import { OrderAdditionalData } from "../additionalData";

export interface IOrderGetMapper {
    toDto(dbModel: OrderModel): OrderGetOutputDto
}

export interface IOrderCreateMapper {
    toDto(dbModel: OrderModel): OrderCreateOutputDto
    toDbModel(dtoModel: OrderCreateInputDto, additionalData: OrderAdditionalData): OrderCreateInput
}

// export interface IOrderUpdateMapper extends IDatabaseToDtoMapper<OrderModel, OrderUpdateOutputDTO>,
//                                               IDtoToDatabaseMapper<OrderUpdateInputDTO, OrderModel>,
//                                               IObjectToDtoMapper<OrderUpdateInputDTO> {}
