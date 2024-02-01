import { mapManyModels } from "@src/utils/mapManyModels";
import { OrderItemGetOutputDTO, OrderItemCreateInputDTO, OrderItemCreateOutputDTO } from "../../dto/orderItem";
import { OrderItemNotFoundWithIdError } from "../../errors/orderItem";
import { IOrderItemCreateMapper, IOrderItemGetMapper } from "../../mappers/interfaces/orderItem";
import IOrderItemRepository from "../../repositories/interfaces/IOrderItemRepository";
import IOrderItemService from "../interfaces/IOrderItemService";
import IMenuItemRepository from "@src/modules/menu/repositories/interfaces/IMenuItemRepository";
import { MenuItemNotFoundWithIdError } from "@src/modules/menu/errors/menuItem";
import { CustomerModel } from "@src/modules/users/models/customer";
import IOrderRepository from "../../repositories/interfaces/IOrderRepository";
import { OrderCourierOwnershipError, OrderCustomerOwnershipError, OrderNotFoundWithIdError } from "../../errors/order";
import { PermissionDeniedError } from "@src/modules/users/errors/permissions";
import { OrderItemModel } from "../../models/orderItem";
import { CourierModel } from "@src/modules/users/models/courier";

export class OrderItemService implements IOrderItemService {
    
    constructor(
        protected orderItemGetMapper: IOrderItemGetMapper,
        protected orderItemCreateMapper: IOrderItemCreateMapper,
        protected orderItemRepository: IOrderItemRepository,
        protected orderRepository: IOrderRepository,
        protected menuItemRepository: IMenuItemRepository,
        protected customer?: CustomerModel,
        protected courier?: CourierModel
    ) {}

    // public async getOne(id: number): Promise<OrderItemGetOutputDTO> {
        
    //     // Check if user is customer
    //     if (!this.customer) {
    //         throw new PermissionDeniedError()
    //     }
        
    //     // Get order item instance
    //     const orderItemInstance = await this.orderItemRepository.getOne(id)

    //     if (!orderItemInstance) {
    //         throw new OrderItemNotFoundWithIdError(id)
    //     }

    //     // Get order
    //     const orderId = Number(orderItemInstance.id)
    //     const orderInstance = await this.orderRepository.getOne(orderId)

    //     if (!orderInstance) {
    //         throw new OrderNotFoundWithIdError(orderId)
    //     }

    //     // Check that customer owns order
    //     if (orderInstance.customerId !== this.customer.id) {
    //         throw new OrderCustomerOwnershipError(orderId)
    //     }

    //     return this.orderItemGetMapper.toDto(orderItemInstance)
    // }
    
    public async getOrderItems(orderId: number): Promise<OrderItemGetOutputDTO[]> {

        // Check if user is customer or courier
        if (!(this.customer || this.courier)) {
            throw new PermissionDeniedError()
        }

        // Get order with items
        const orderInstance = await this.orderRepository.getOne(orderId, true)

        if (!orderInstance) {
            throw new OrderNotFoundWithIdError(orderId)
        }

        // Check that customer owns order
        if (this.customer)
            if (orderInstance.customerId !== this.customer.id) {
                throw new OrderCustomerOwnershipError(orderId)
            }
        
        // Check that courier owns order
        if (this.courier)
            if (orderInstance.courierId !== this.courier.id) {
                throw new OrderCourierOwnershipError(orderId)
            }
        
        return mapManyModels(orderInstance.items as OrderItemModel[], this.orderItemGetMapper.toDto)
    }
    
    public async addOrderItem(orderId: number, orderItemData: OrderItemCreateInputDTO): Promise<OrderItemCreateOutputDTO> {

        // Check if user is customer
        if (!this.customer) {
            throw new PermissionDeniedError()
        }

        // Check that order exists
        const orderInstance = await this.orderRepository.getOne(orderId, true)

        if (!orderInstance) {
            throw new OrderNotFoundWithIdError(orderId)
        }

        const orderItemsInstances = orderInstance.items as OrderItemModel[]

        // Check that menu item exists
        const menuItemInstance = await this.menuItemRepository.getOne(orderItemData.menuItemId)

        if (!menuItemInstance) {
            throw new MenuItemNotFoundWithIdError(orderItemData.menuItemId)
        }

        // Check that customer owns this order
        if (orderInstance.customerId !== this.customer.id) {
            throw new OrderCustomerOwnershipError(orderId)
        }

        // Check that menu item is in same restaurant as order
        if (orderInstance.restaurantId !== menuItemInstance.restaurantId) {
            // bla bla bla
        }

        // Check that menu item is not already in order
        if (orderItemsInstances.find((orderItem) => orderItem.menuItemName === menuItemInstance.name && 
                                                    orderItem.menuItemImageUrl === menuItemInstance.imageUrl && 
                                                    orderItem.menuItemPrice === menuItemInstance.price)) {
            // bab bob
        }

        const orderItemInput = this.orderItemCreateMapper.toDbModel(orderItemData, {
            menuItemName: menuItemInstance.name,
            menuItemImageUrl: menuItemInstance.imageUrl,
            menuItemPrice: menuItemInstance.price,
            orderId: orderId    
        })        

        const orderItemInstance = await this.orderItemRepository.create(orderItemInput)
        return this.orderItemCreateMapper.toDto(orderItemInstance)
    }

}