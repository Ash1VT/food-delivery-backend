import { OrderItemModel, OrderItemCreateInput, OrderItemUpdateInput } from "../../models/orderItem";
import IBaseRepository from "./IBaseRepository";

export default interface IOrderItemRepository
                         extends IBaseRepository<OrderItemModel, OrderItemCreateInput, OrderItemUpdateInput> {

}