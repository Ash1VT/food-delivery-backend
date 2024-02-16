import IBaseService from "@src/core/services/IBaseService";
import { OrderGetOutputDto, OrderCreateInputDto, OrderCreateOutputDto } from "../../dto/order.dto";
import { OrderStatus } from "../../models/orderStatus.models";

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

    // Customer
    makeOrder(orderData: OrderCreateInputDto): Promise<OrderCreateOutputDto>

    // Courier
    takeOrder(orderId: bigint): Promise<void>
    
    // Courier
    finishOrderDelivery(orderId: bigint): Promise<void>
}