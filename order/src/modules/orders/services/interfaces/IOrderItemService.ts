import IBaseService from '@src/core/services/IBaseService';
import { OrderItemGetOutputDto, OrderItemCreateInputDto, OrderItemCreateOutputDto, OrderItemUpdateOutputDto, OrderItemUpdateInputDto } from '../../dto/orderItem.dto';

export default interface IOrderItemService extends IBaseService {
    // getOne(id: number): Promise<OrderItemGetOutputDTO>

    // Customer or courier
    getOrderItems(orderId: bigint): Promise<OrderItemGetOutputDto[]>

    // Customer
    updateOrderItem(orderId: bigint, orderItemId: bigint, orderItemData: OrderItemUpdateInputDto): Promise<OrderItemUpdateOutputDto>

    // Customer
    addOrderItem(orderId: bigint, orderItemData: OrderItemCreateInputDto): Promise<OrderItemCreateOutputDto>

    // Customer
    removeOrderItem(orderId: bigint, orderItemId: bigint): Promise<void>
}