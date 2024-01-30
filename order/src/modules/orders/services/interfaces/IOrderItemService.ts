import ICreateService from '@src/base/services/interfaces/ICreateService';
import { OrderItemGetOutputDTO, OrderItemCreateInputDTO, OrderItemCreateOutputDTO } from './../../dto/orderItem';
import IGetService from "@src/base/services/interfaces/IGetService";

export default interface IOrderItemService extends IGetService<OrderItemGetOutputDTO>, ICreateService<OrderItemCreateInputDTO, OrderItemCreateOutputDTO> {}