import IGetService from "@src/base/services/interfaces/IGetService";
import { OrderGetOutputDTO, OrderCreateInputDTO, OrderCreateOutputDTO } from "../../dto/order";
import { OrderStatus } from "../../models/orderStatus";

export default interface IOrderService extends IGetService<OrderGetOutputDTO> {
    // cancel order


    getMany(status?: OrderStatus): Promise<OrderGetOutputDTO[]>

    // Courier
    getCurrentCourierOrders(status?: OrderStatus): Promise<OrderGetOutputDTO[]>

    // Customer
    getCurrentCustomerOrders(status?: OrderStatus): Promise<OrderGetOutputDTO[]>

    // Courier
    getReadyOrders(): Promise<OrderGetOutputDTO[]>

    // Restaurant Manager
    getCurrentRestaurantOrders(status?: OrderStatus): Promise<OrderGetOutputDTO[]>

    // Customer
    makeOrder(orderData: OrderCreateInputDTO): Promise<OrderCreateOutputDTO>

    // Courier
    takeOrder(orderId: number): Promise<void>
    
    // Courier
    finishOrderDelivery(orderId: number): Promise<void>
}

// Customer
// get his active orders +
// get his finished orders +
// get all his orders +
// make an order +

// Courier
// get his active orders +
// get his finished orders +
// get all his orders +
// get all orders ready for delivering +
// take an order for starting delivery +
// confirm finishing delivery +