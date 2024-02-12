import { OrderGetMapper, OrderCreateMapper } from "../../implementations/order.mappers";
import { OrderItemGetMapper, OrderItemCreateMapper } from "../../implementations/orderItem.mappers";
import { IOrderGetMapper, IOrderCreateMapper } from "../../interfaces/order.mappers";
import { IOrderItemGetMapper, IOrderItemCreateMapper } from "../../interfaces/orderItem.mappers";
import { IOrderMapperFactory } from "../interfaces/IOrderMapperFactory";

export class OrderMapperFactory implements IOrderMapperFactory {
    public createOrderGetMapper(): IOrderGetMapper {
        return new OrderGetMapper(this.createOrderItemGetMapper());
    }

    public createOrderCreateMapper(): IOrderCreateMapper {
        return new OrderCreateMapper(this.createOrderItemCreateMapper());
    }

    public createOrderItemGetMapper(): IOrderItemGetMapper {
        return new OrderItemGetMapper();
    }

    public createOrderItemCreateMapper(): IOrderItemCreateMapper {
        return new OrderItemCreateMapper();
    }
}