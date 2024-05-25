import { OrderItemGetOutputDto, OrderItemCreateInputDto, OrderItemCreateOutputDto } from "../../dto/orderItem.dto";
import { IOrderItemCreateMapper, IOrderItemGetMapper } from "../../mappers/interfaces/orderItem.mappers";
import IOrderItemRepository from "../../repositories/interfaces/IOrderItemRepository";
import IOrderItemService from "../interfaces/IOrderItemService";
import IMenuItemRepository from "@src/modules/menu/repositories/interfaces/IMenuItemRepository";
import IOrderRepository from "../../repositories/interfaces/IOrderRepository";
import { OrderNotFoundWithIdError, OrderNotPendingError, OrderNotPlacingError } from "../../errors/order.errors";
import { PermissionDeniedError } from "@src/modules/users/errors/permissions.errors";
import { OrderItemModel } from "../../models/orderItem.models";
import { CourierOwnershipError } from "@src/modules/users/errors/courier.errors";
import { CustomerOrderOwnershipError } from "@src/modules/users/errors/customer.errors";
import BaseService from "@src/core/services/BaseService";
import { MenuItemNotFoundWithIdError, MenuItemNotInSameOrderRestaurantError, MenuItemAlreadyInOrderError } from "@src/modules/menu/errors/menuItem.errors";
import { OrderItemNotFoundWithIdError, OrderItemNotInOrderError } from "../../errors/orderItem.errors";

export class OrderItemService extends BaseService implements IOrderItemService {
    
    constructor(
        protected orderItemGetMapper: IOrderItemGetMapper,
        protected orderItemCreateMapper: IOrderItemCreateMapper,
        protected orderItemRepository: IOrderItemRepository,
        protected orderRepository: IOrderRepository,
        protected menuItemRepository: IMenuItemRepository
    ) {
        super()
    }

    public async getOrderItems(orderId: bigint): Promise<OrderItemGetOutputDto[]> {

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
                throw new CustomerOrderOwnershipError(this.customer.id, orderId)
            }
        
        // Check that courier owns order
        if (this.courier)
            if (orderInstance.courierId !== this.courier.id) {
                throw new CourierOwnershipError(this.courier.id, orderId)
            }
        
        return (orderInstance.items as OrderItemModel[]).map((orderItem) => this.orderItemGetMapper.toDto(orderItem))
    }
    
    public async addOrderItem(orderId: bigint, orderItemData: OrderItemCreateInputDto): Promise<OrderItemCreateOutputDto> {

        // Check if user is customer
        if (!this.customer) {
            throw new PermissionDeniedError()
        }

        // Check that order exists
        const orderInstance = await this.orderRepository.getOne(orderId, true)

        if (!orderInstance) {
            throw new OrderNotFoundWithIdError(orderId)
        }

        // Check that order is in PLACING status
        if (orderInstance.status !== "PLACING") {
            throw new OrderNotPlacingError(orderId)
        }

        // Check that menu item exists
        const menuItemInstance = await this.menuItemRepository.getOne(orderItemData.menuItemId)

        if (!menuItemInstance) {
            throw new MenuItemNotFoundWithIdError(orderItemData.menuItemId)
        }

        // Check that customer owns this order
        if (orderInstance.customerId !== this.customer.id) {
            throw new CustomerOrderOwnershipError(this.customer.id, orderId)
        }

        // Check that menu item is in same restaurant as order
        if (orderInstance.restaurantId !== menuItemInstance.restaurantId) {
            throw new MenuItemNotInSameOrderRestaurantError(menuItemInstance.name, orderId)
        }

        const orderItemsInstances = orderInstance.items as OrderItemModel[]

        // Check that menu item is not already in order
        const orderItem = orderItemsInstances.find((orderItem) => orderItem.menuItemName === menuItemInstance.name && 
                                                    orderItem.menuItemImageUrl === menuItemInstance.imageUrl && 
                                                    orderItem.menuItemPrice === menuItemInstance.price)

        if (orderItem) {
            throw new MenuItemAlreadyInOrderError(orderItem.menuItemName, orderId)
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

    
    public async removeOrderItem(orderId: bigint, orderItemId: bigint): Promise<void> {
        // Check if user is customer
        if (!this.customer) {
            throw new PermissionDeniedError()
        }

        // Check that order exists
        const orderInstance = await this.orderRepository.getOne(orderId, true)

        if (!orderInstance) {
            throw new OrderNotFoundWithIdError(orderId)
        }

        // Check that order is in PLACING status
        if (orderInstance.status !== "PLACING") {
            throw new OrderNotPlacingError(orderId)
        }

        // Check that customer owns this order
        if (orderInstance.customerId !== this.customer.id) {
            throw new CustomerOrderOwnershipError(this.customer.id, orderId)
        }

        // Check that order item exists
        const orderItemInstance = await this.orderItemRepository.getOne(orderItemId)

        if (!orderItemInstance) {
            throw new OrderItemNotFoundWithIdError(orderItemId)
        }

        // Check that order item is in order
        const orderItem = (orderInstance.items as OrderItemModel[]).find((orderItem) => orderItem.id === orderItemId)

        if (!orderItem) {
            throw new OrderItemNotInOrderError(orderId, orderItemId)
        }

        await this.orderItemRepository.delete(orderItemId)
    }

}