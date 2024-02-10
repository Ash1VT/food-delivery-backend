import { OrderItemGetOutputDto, OrderItemCreateInputDto, OrderItemCreateOutputDto } from '../../dto/orderItem.dto';

export default interface IOrderItemService {
    // getOne(id: number): Promise<OrderItemGetOutputDTO>

    // Customer or courier
    getOrderItems(orderId: bigint): Promise<OrderItemGetOutputDto[]>
    
    // Customer
    addOrderItem(orderId: bigint, orderItemData: OrderItemCreateInputDto): Promise<OrderItemCreateOutputDto>
}