import { OrderGetOutputDTO, OrderCreateInputDTO, OrderCreateOutputDTO } from "../../dto/order";
import { OrderStatus } from "../../models/orderStatus";

export default interface IOrderService {
    // cancel order

    // Moderator
    getMany(status?: OrderStatus): Promise<OrderGetOutputDTO[]>

    // Courier
    getCurrentCourierOrders(status?: OrderStatus): Promise<OrderGetOutputDTO[]>

    // Customer
    getCurrentCustomerOrders(status?: OrderStatus): Promise<OrderGetOutputDTO[]>

    // Courier
    getReadyOrders(): Promise<OrderGetOutputDTO[]>

    // Restaurant Manager
    getRestaurantOrders(restaurantId: bigint, status?: OrderStatus): Promise<OrderGetOutputDTO[]>

    // Customer
    makeOrder(orderData: OrderCreateInputDTO): Promise<OrderCreateOutputDTO>

    // Courier
    takeOrder(orderId: bigint): Promise<void>
    
    // Courier
    finishOrderDelivery(orderId: bigint): Promise<void>
}