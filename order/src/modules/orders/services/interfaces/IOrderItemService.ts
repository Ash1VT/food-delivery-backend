import { OrderItemGetOutputDTO, OrderItemCreateInputDTO, OrderItemCreateOutputDTO } from './../../dto/orderItem';

export default interface IOrderItemService {
    // getOne(id: number): Promise<OrderItemGetOutputDTO>

    // Customer or courier
    getOrderItems(orderId: number): Promise<OrderItemGetOutputDTO[]>
    
    // Customer
    addOrderItem(orderId: number, orderItemData: OrderItemCreateInputDTO): Promise<OrderItemCreateOutputDTO>
}