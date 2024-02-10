import { OrderItemModel, OrderItemCreateInput, OrderItemUpdateInput } from "../../models/orderItem.models";
import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";

export default interface IOrderItemRepository extends IBaseRepository<OrderItemModel, OrderItemCreateInput, OrderItemUpdateInput> {
    getOrderItems(orderId: bigint): Promise<OrderItemModel[]>
}