import { OrderItemModel, OrderItemCreateInput, OrderItemUpdateInput } from "../../models/orderItem";
import IBaseRepository from "@src/base/repositories/interfaces/IBaseRepository";

export default interface IOrderItemRepository
                         extends IBaseRepository<OrderItemModel, OrderItemCreateInput, OrderItemUpdateInput> {

}