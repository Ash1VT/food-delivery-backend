import { OrderStatus } from './../../models/orderStatus';
import { OrderModel, OrderCreateInput, OrderUpdateInput } from "../../models/order";
import IBaseRepository from "@src/base/repositories/interfaces/IBaseRepository";

export default interface IOrderRepository extends IBaseRepository<OrderModel, OrderCreateInput, OrderUpdateInput> {
    getMany(includeItems?: boolean, status?: OrderStatus): Promise<OrderModel[]>
    getCustomerOrders(customerId: number, includeItems?: boolean, status?: OrderStatus): Promise<OrderModel[]>
    getCourierOrders(courierId: number, includeItems?: boolean, status?: OrderStatus): Promise<OrderModel[]>
    getRestaurantOrders(restaurantId: number, includeItems?: boolean, status?: OrderStatus): Promise<OrderModel[]>
}