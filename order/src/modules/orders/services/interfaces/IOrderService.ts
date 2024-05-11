import IBaseService from "@src/core/services/IBaseService";
import { OrderGetOutputDto, OrderCreateInputDto, OrderCreateOutputDto } from "../../dto/order.dto";
import { OrderStatus } from "../../models/orderStatus.models";
import { DeliveryType } from "../../models/deliveryType.models";

export default interface IOrderService extends IBaseService {
    // cancel order

    // Moderator
    getMany(status?: OrderStatus): Promise<OrderGetOutputDto[]>

    // Courier
    getCurrentCourierOrders(status?: OrderStatus): Promise<OrderGetOutputDto[]>

    // Customer
    getCurrentCustomerOrders(status?: OrderStatus): Promise<OrderGetOutputDto[]>

    // Courier
    getReadyOrders(): Promise<OrderGetOutputDto[]>

    // Restaurant Manager
    getRestaurantOrders(restaurantId: bigint, status?: OrderStatus): Promise<OrderGetOutputDto[]>

    // Moderator
    confirmOrder(orderId: bigint): Promise<void>

    // Restaurant Manager
    prepareOrder(orderId: bigint): Promise<void>

    // Moderator
    cancelOrder(orderId: bigint): Promise<void>

    // Customer
    makeOrder(orderData: OrderCreateInputDto): Promise<OrderCreateOutputDto>

    // Courier
    takeOrder(orderId: bigint, deliveryType: DeliveryType): Promise<void>
    
    // Courier
    finishOrderDelivery(orderId: bigint): Promise<void>
}