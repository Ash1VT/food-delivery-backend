import { OrderItemModel, OrderItemCreateInput, OrderItemUpdateInput } from "../../models/orderItem";
import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";

export default interface IOrderItemRepository extends IBaseRepository<OrderItemModel, OrderItemCreateInput, OrderItemUpdateInput> {
    getOrderItems(orderId: number): Promise<OrderItemModel[]>
}