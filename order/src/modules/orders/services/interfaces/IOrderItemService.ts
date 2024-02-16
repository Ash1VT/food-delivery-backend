import IBaseService from '@src/core/services/IBaseService';
import { OrderItemGetOutputDto, OrderItemCreateInputDto, OrderItemCreateOutputDto } from '../../dto/orderItem.dto';

export default interface IOrderItemService extends IBaseService {
    // getOne(id: number): Promise<OrderItemGetOutputDTO>

    // Customer or courier
    getOrderItems(orderId: bigint): Promise<OrderItemGetOutputDto[]>
    
    // Customer
    addOrderItem(orderId: bigint, orderItemData: OrderItemCreateInputDto): Promise<OrderItemCreateOutputDto>
}