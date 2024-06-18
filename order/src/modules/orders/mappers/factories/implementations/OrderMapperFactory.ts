import { DeliveryInformationCreateMapper, DeliveryInformationGetMapper, DeliveryInformationUpdateMapper } from "../../implementations/deliveryInformation.mappers";
import { OrderGetMapper, OrderCreateMapper, OrderUpdateMapper } from "../../implementations/order.mappers";
import { OrderItemGetMapper, OrderItemCreateMapper, OrderItemUpdateMapper } from "../../implementations/orderItem.mappers";
import { PaymentInformationCreateMapper, PaymentInformationGetMapper, PaymentInformationUpdateMapper } from "../../implementations/paymentInformation.mappers";
import { PriceInformationCreateMapper, PriceInformationGetMapper, PriceInformationUpdateMapper } from "../../implementations/priceInformation.mappers";
import { IDeliveryInformationCreateMapper, IDeliveryInformationGetMapper, IDeliveryInformationUpdateMapper } from "../../interfaces/deliveryInformation.mappers";
import { IOrderGetMapper, IOrderCreateMapper, IOrderUpdateMapper } from "../../interfaces/order.mappers";
import { IOrderItemGetMapper, IOrderItemCreateMapper, IOrderItemUpdateMapper } from "../../interfaces/orderItem.mappers";
import { IPaymentInformationGetMapper, IPaymentInformationCreateMapper, IPaymentInformationUpdateMapper } from "../../interfaces/paymentInformation.mappers";
import { IPriceInformationCreateMapper, IPriceInformationGetMapper, IPriceInformationUpdateMapper } from "../../interfaces/priceInformation.mappers";
import { IOrderMapperFactory } from "../interfaces/IOrderMapperFactory";

export class OrderMapperFactory implements IOrderMapperFactory {

    public createOrderGetMapper(): IOrderGetMapper {
        return new OrderGetMapper(
            this.createOrderItemGetMapper(), 
            this.createDeliveryInformationGetMapper(),
            this.createPriceInformationGetMapper(),
            this.createPaymentInformationGetMapper()
        );
    }

    public createOrderCreateMapper(): IOrderCreateMapper {
        return new OrderCreateMapper(
            this.createOrderItemCreateMapper(),
            this.createDeliveryInformationCreateMapper(),
            this.createPriceInformationCreateMapper(),
            this.createPaymentInformationCreateMapper()
        );
    }

    public createOrderUpdateMapper(): IOrderUpdateMapper {
        return new OrderUpdateMapper(
            this.createOrderItemUpdateMapper(),
            this.createDeliveryInformationUpdateMapper(),
            this.createPriceInformationUpdateMapper(),
            this.createPaymentInformationUpdateMapper()
        );
    }

    public createOrderItemGetMapper(): IOrderItemGetMapper {
        return new OrderItemGetMapper();
    }

    public createOrderItemCreateMapper(): IOrderItemCreateMapper {
        return new OrderItemCreateMapper();
    }

    public createOrderItemUpdateMapper(): IOrderItemUpdateMapper {
        return new OrderItemUpdateMapper();
    }

    public createDeliveryInformationGetMapper(): IDeliveryInformationGetMapper {
        return new DeliveryInformationGetMapper();
    }

    public createDeliveryInformationCreateMapper(): IDeliveryInformationCreateMapper {
        return new DeliveryInformationCreateMapper();
    }

    public createDeliveryInformationUpdateMapper(): IDeliveryInformationUpdateMapper {
        return new DeliveryInformationUpdateMapper();
    }

    public createPriceInformationGetMapper(): IPriceInformationGetMapper {
        return new PriceInformationGetMapper();
    }

    public createPriceInformationCreateMapper(): IPriceInformationCreateMapper {
        return new PriceInformationCreateMapper();
    }

    public createPriceInformationUpdateMapper(): IPriceInformationUpdateMapper {
        return new PriceInformationUpdateMapper();
    }

    public createPaymentInformationGetMapper(): IPaymentInformationGetMapper {
        return new PaymentInformationGetMapper()
    }

    public createPaymentInformationCreateMapper(): IPaymentInformationCreateMapper {
        return new PaymentInformationCreateMapper()
    }
    
    public createPaymentInformationUpdateMapper(): IPaymentInformationUpdateMapper {
        return new PaymentInformationUpdateMapper()
    }
}