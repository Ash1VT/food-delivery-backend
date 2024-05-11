import { DeliveryInformationCreateMapper, DeliveryInformationGetMapper } from "../../implementations/deliveryInformation.mappers";
import { OrderGetMapper, OrderCreateMapper } from "../../implementations/order.mappers";
import { OrderItemGetMapper, OrderItemCreateMapper } from "../../implementations/orderItem.mappers";
import { IDeliveryInformationCreateMapper, IDeliveryInformationGetMapper } from "../../interfaces/deliveryInformation.mappers";
import { IOrderGetMapper, IOrderCreateMapper } from "../../interfaces/order.mappers";
import { IOrderItemGetMapper, IOrderItemCreateMapper } from "../../interfaces/orderItem.mappers";
import { IOrderMapperFactory } from "../interfaces/IOrderMapperFactory";

export class OrderMapperFactory implements IOrderMapperFactory {
    public createOrderGetMapper(): IOrderGetMapper {
        return new OrderGetMapper(
            this.createOrderItemGetMapper(), 
            this.createDeliveryInformationGetMapper()
        );
    }

    public createOrderCreateMapper(): IOrderCreateMapper {
        return new OrderCreateMapper(
            this.createOrderItemCreateMapper(),
            this.createDeliveryInformationCreateMapper()
        );
    }

    public createOrderItemGetMapper(): IOrderItemGetMapper {
        return new OrderItemGetMapper();
    }

    public createOrderItemCreateMapper(): IOrderItemCreateMapper {
        return new OrderItemCreateMapper();
    }

    public createDeliveryInformationGetMapper(): IDeliveryInformationGetMapper {
        return new DeliveryInformationGetMapper();
    }

    public createDeliveryInformationCreateMapper(): IDeliveryInformationCreateMapper {
        return new DeliveryInformationCreateMapper();
    }
}