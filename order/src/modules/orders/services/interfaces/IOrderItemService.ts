import { OrderItemGetOutputDTO, OrderItemCreateInputDTO, OrderItemCreateOutputDTO } from './../../dto/orderItem';

export default interface IOrderItemService {
    // getOne(id: number): Promise<OrderItemGetOutputDTO>

    // Customer or courier
    getOrderItems(orderId: bigint): Promise<OrderItemGetOutputDTO[]>
    
    // Customer
    addOrderItem(orderId: bigint, orderItemData: OrderItemCreateInputDTO): Promise<OrderItemCreateOutputDTO>
}