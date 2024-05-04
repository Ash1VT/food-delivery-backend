import { IOrderGetMapper, IOrderCreateMapper } from "../../interfaces/order.mappers";
import { IOrderItemGetMapper, IOrderItemCreateMapper } from "../../interfaces/orderItem.mappers";

export interface IOrderMapperFactory {
    createOrderGetMapper(): IOrderGetMapper;
    createOrderCreateMapper(): IOrderCreateMapper;
    createOrderItemGetMapper(): IOrderItemGetMapper;
    createOrderItemCreateMapper(): IOrderItemCreateMapper;
}