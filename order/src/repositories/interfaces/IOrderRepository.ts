import { OrderModel, OrderCreateInput, OrderUpdateInput } from "../../models/order";
import IBaseRepository from "./IBaseRepository";

export default interface IOrderRepository
                         extends IBaseRepository<OrderModel, OrderCreateInput, OrderUpdateInput> {
    getCustomerOrders(customerId: number): Promise<OrderModel[]>
    getRestaurantOrders(restaurantId: number): Promise<OrderModel[]>
}