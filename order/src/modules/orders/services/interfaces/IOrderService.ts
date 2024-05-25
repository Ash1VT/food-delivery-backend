import IBaseService from "@src/core/services/IBaseService";
import { OrderGetOutputDto, OrderCreateInputDto, OrderCreateOutputDto, OrderUpdateInputDto, OrderUpdateOutputDto } from "../../dto/order.dto";
import { OrderStatus } from "../../models/orderStatus.models";
import { DeliveryType } from "../../models/deliveryType.models";

export default interface IOrderService extends IBaseService {
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

    // RestaurantManager
    confirmOrder(orderId: bigint): Promise<OrderUpdateOutputDto>

    // Restaurant Manager
    prepareOrder(orderId: bigint): Promise<OrderUpdateOutputDto>

    // Moderator
    cancelOrder(orderId: bigint): Promise<OrderUpdateOutputDto>

    // Customer
    makeOrder(orderData: OrderCreateInputDto): Promise<OrderCreateOutputDto>

    // Customer
    updateOrder(orderId: bigint, orderData: OrderUpdateInputDto): Promise<OrderUpdateOutputDto>

    // Customer
    placeOrder(orderId: bigint): Promise<OrderUpdateOutputDto>

    // Courier
    takeOrder(orderId: bigint, deliveryType: DeliveryType): Promise<OrderUpdateOutputDto>
    
    // Courier
    finishOrderDelivery(orderId: bigint): Promise<OrderUpdateOutputDto>
}