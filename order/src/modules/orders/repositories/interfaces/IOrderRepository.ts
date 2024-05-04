import { OrderStatus } from '../../models/orderStatus.models';
import { OrderModel, OrderCreateInput, OrderUpdateInput } from "../../models/order.models";
import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";

export default interface IOrderRepository extends IBaseRepository<OrderModel, OrderCreateInput, OrderUpdateInput> {
    getOne(id: bigint, includeItems?: boolean): Promise<OrderModel | null>
    getMany(includeItems?: boolean, status?: OrderStatus): Promise<OrderModel[]>
    getCustomerOrders(customerId: bigint, includeItems?: boolean, status?: OrderStatus): Promise<OrderModel[]>
    getCourierOrders(courierId: bigint, includeItems?: boolean, status?: OrderStatus): Promise<OrderModel[]>
    getRestaurantOrders(restaurantId: bigint, includeItems?: boolean, status?: OrderStatus): Promise<OrderModel[]>
}