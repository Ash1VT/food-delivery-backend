import { OrderModel, OrderCreateInput, OrderUpdateInput } from "../../models/order";
import IBaseRepository from "./IBaseRepository";

export default interface IOrderRepository
                         extends IBaseRepository<OrderModel, OrderCreateInput, OrderUpdateInput> {

}