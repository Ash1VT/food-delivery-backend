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
import getLogger from "@src/core/setup/logger";


const logger = getLogger(module)

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
            logger.warn("User is not authenticated as Customer or Courier")
            throw new PermissionDeniedError()
        }

        // Get order with items
        const orderInstance = await this.orderRepository.getOne(orderId, true)

        if (!orderInstance) {
            logger.warn(`Order with id=${orderId} not found`)
            throw new OrderNotFoundWithIdError(orderId)
        }

        // Check that customer owns order
        if (this.customer)
            if (orderInstance.customerId !== this.customer.id) {
                logger.warn(`Customer with id=${this.customer.id} does not own Order with id=${orderId}`)
                throw new CustomerOrderOwnershipError(this.customer.id, orderId)
            }
        
        // Check that courier owns order
        if (this.courier)
            if (orderInstance.courierId !== this.courier.id) {
                logger.warn(`Courier with id=${this.courier.id} does not own Order with id=${orderId}`)
                throw new CourierOwnershipError(this.courier.id, orderId)
            }
        
        const orderItemsDtos = (orderInstance.items as OrderItemModel[]).map((orderItem) => this.orderItemGetMapper.toDto(orderItem))

        logger.info(`Retrieved list of OrderItems for Order with id=${orderId}`)

        return orderItemsDtos
    }
    
    public async addOrderItem(orderId: bigint, orderItemData: OrderItemCreateInputDto): Promise<OrderItemCreateOutputDto> {

        // Check if user is customer
        if (!this.customer) {
            logger.warn("User is not authenticated as Customer")
            throw new PermissionDeniedError()
        }

        // Check that order exists
        const orderInstance = await this.orderRepository.getOne(orderId, true)

        if (!orderInstance) {
            logger.warn(`Order with id=${orderId} not found`)
            throw new OrderNotFoundWithIdError(orderId)
        }

        // Check that order is in PLACING status
        if (orderInstance.status !== "PLACING") {
            logger.warn(`Order with id=${orderId} is not in 'Placing' status`)
            throw new OrderNotPlacingError(orderId)
        }

        // Check that menu item exists
        const menuItemInstance = await this.menuItemRepository.getOne(orderItemData.menuItemId)

        if (!menuItemInstance) {
            logger.warn(`MenuItem with id=${orderItemData.menuItemId} not found`)
            throw new MenuItemNotFoundWithIdError(orderItemData.menuItemId)
        }

        // Check that customer owns this order
        if (orderInstance.customerId !== this.customer.id) {
            logger.warn(`Customer with id=${this.customer.id} does not own Order with id=${orderId}`)
            throw new CustomerOrderOwnershipError(this.customer.id, orderId)
        }

        // Check that menu item is in same restaurant as order
        if (orderInstance.restaurantId !== menuItemInstance.restaurantId) {
            logger.warn(`MenuUtem with id=${orderItemData.menuItemId} is not in same restaurant as Order with id=${orderId}`)
            throw new MenuItemNotInSameOrderRestaurantError(menuItemInstance.name, orderId)
        }

        const orderItemsInstances = orderInstance.items as OrderItemModel[]

        // Check that menu item is not already in order
        const orderItem = orderItemsInstances.find((orderItem) => orderItem.menuItemName === menuItemInstance.name && 
                                                    orderItem.menuItemImageUrl === menuItemInstance.imageUrl && 
                                                    orderItem.menuItemPrice === menuItemInstance.price)

        if (orderItem) {
            logger.warn(`MenuItem with name=${menuItemInstance.name}, image=${menuItemInstance.imageUrl} and price=${menuItemInstance.price} is already in Order with id=${orderId}`)
            throw new MenuItemAlreadyInOrderError(orderItem.menuItemName, orderId)
        }

        const orderItemInput = this.orderItemCreateMapper.toDbModel(orderItemData, {
            menuItemName: menuItemInstance.name,
            menuItemImageUrl: menuItemInstance.imageUrl,
            menuItemPrice: menuItemInstance.price,
            orderId: orderId    
        })        

        const orderItemInstance = await this.orderItemRepository.create(orderItemInput)
        const orderItemDto = this.orderItemCreateMapper.toDto(orderItemInstance)

        logger.info(`Added MenuItem with name=${menuItemInstance.name}, image=${menuItemInstance.imageUrl} and price=${menuItemInstance.price} to Order with id=${orderId}`)

        return orderItemDto
    }

    
    public async removeOrderItem(orderId: bigint, orderItemId: bigint): Promise<void> {
        // Check if user is customer
        if (!this.customer) {
            logger.warn("User is not authenticated as Customer")
            throw new PermissionDeniedError()
        }

        // Check that order exists
        const orderInstance = await this.orderRepository.getOne(orderId, true)

        if (!orderInstance) {
            logger.warn(`Order with id=${orderId} not found`)
            throw new OrderNotFoundWithIdError(orderId)
        }

        // Check that order is in PLACING status
        if (orderInstance.status !== "PLACING") {
            logger.warn(`Order with id=${orderId} is not in 'Placing' status`)
            throw new OrderNotPlacingError(orderId)
        }

        // Check that customer owns this order
        if (orderInstance.customerId !== this.customer.id) {
            logger.warn(`Customer with id=${this.customer.id} does not own Order with id=${orderId}`)
            throw new CustomerOrderOwnershipError(this.customer.id, orderId)
        }

        // Check that order item exists
        const orderItemInstance = await this.orderItemRepository.getOne(orderItemId)

        if (!orderItemInstance) {
            logger.warn(`OrderItem with id=${orderItemId} not found`)
            throw new OrderItemNotFoundWithIdError(orderItemId)
        }

        // Check that order item is in order
        const orderItem = (orderInstance.items as OrderItemModel[]).find((orderItem) => orderItem.id === orderItemId)

        if (!orderItem) {
            logger.warn(`OrderItem with id=${orderItemId} is not in Order with id=${orderId}`)
            throw new OrderItemNotInOrderError(orderId, orderItemId)
        }

        await this.orderItemRepository.delete(orderItemId)
        logger.info(`Removed OrderItem with id=${orderItemId} from Order with id=${orderId}`)
    }

}