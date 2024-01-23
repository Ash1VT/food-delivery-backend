import { OrderModel, OrderCreateInput, OrderUpdateInput } from "../../models/order";
import IBaseRepository from "../../../../base/repositories/interfaces/IBaseRepository";

export default interface IOrderRepository
                         extends IBaseRepository<OrderModel, OrderCreateInput, OrderUpdateInput> {
    getCustomerOrders(customerId: number): Promise<OrderModel[]>
    getCourierOrders(courierId: number): Promise<OrderModel[]>
    getRestaurantOrders(restaurantId: number): Promise<OrderModel[]>
}