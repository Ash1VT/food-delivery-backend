import ICreateService from "@src/base/services/interfaces/ICreateService";
import IGetService from "@src/base/services/interfaces/IGetService";
import { OrderGetOutputDTO, OrderCreateInputDTO, OrderCreateOutputDTO } from "../../dto/order";

export default interface IOrderService extends IGetService<OrderGetOutputDTO>, ICreateService<OrderCreateInputDTO, OrderCreateOutputDTO> {
    // getFinishedOrders() 
}