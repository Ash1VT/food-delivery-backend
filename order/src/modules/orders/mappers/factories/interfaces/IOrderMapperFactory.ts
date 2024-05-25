import { IDeliveryInformationGetMapper, IDeliveryInformationCreateMapper, IDeliveryInformationUpdateMapper } from "../../interfaces/deliveryInformation.mappers";
import { IOrderGetMapper, IOrderCreateMapper, IOrderUpdateMapper } from "../../interfaces/order.mappers";
import { IOrderItemGetMapper, IOrderItemCreateMapper, IOrderItemUpdateMapper } from "../../interfaces/orderItem.mappers";
import { IPriceInformationGetMapper, IPriceInformationCreateMapper, IPriceInformationUpdateMapper } from "../../interfaces/priceInformation.mappers";

export interface IOrderMapperFactory {
    createOrderGetMapper(): IOrderGetMapper;
    createOrderCreateMapper(): IOrderCreateMapper;
    createOrderUpdateMapper(): IOrderUpdateMapper;
    createOrderItemGetMapper(): IOrderItemGetMapper;
    createOrderItemCreateMapper(): IOrderItemCreateMapper;
    createOrderItemUpdateMapper(): IOrderItemUpdateMapper;
    createDeliveryInformationGetMapper(): IDeliveryInformationGetMapper;
    createDeliveryInformationCreateMapper(): IDeliveryInformationCreateMapper;
    createDeliveryInformationUpdateMapper(): IDeliveryInformationUpdateMapper;
    createPriceInformationGetMapper(): IPriceInformationGetMapper;
    createPriceInformationCreateMapper(): IPriceInformationCreateMapper;
    createPriceInformationUpdateMapper(): IPriceInformationUpdateMapper;
}