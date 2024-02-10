import { RestaurantManagerOwnershipError } from '@src/modules/users/errors/restaurantManager.errors';
import { OrderGetOutputDto, OrderCreateInputDto, OrderCreateOutputDto } from "../../dto/order.dto";
import { OrderNotDeliveringError, OrderNotFoundWithIdError, OrderNotReadyError } from "../../errors/order.errors";
import { IOrderCreateMapper, IOrderGetMapper } from "../../mappers/interfaces/order.mappers";
import IOrderRepository from "../../repositories/interfaces/IOrderRepository";
import IOrderService from "../interfaces/IOrderService";
import { OrderStatus } from "../../models/orderStatus.models";
import { PromocodeNotActiveError, PromocodeNotBelongsToRestaurantError, PromocodeNotFoundWithNameError, PromocodeAmountUsageError, PromocodeExpiredUsageError, PromocodeNotStartUsageError } from "@src/modules/promotions/errors/promocode.errors";
import { PermissionDeniedError } from "@src/modules/users/errors/permissions.errors";
import IPromocodeRepository from "@src/modules/promotions/repositories/interfaces/IPromocodeRepository";
import IMenuItemRepository from "@src/modules/menu/repositories/interfaces/IMenuItemRepository";
import IRestaurantRepository from "@src/modules/restaurants/repositories/interfaces/IRestaurantRepository";
import { RestaurantNotFoundWithIdError } from "@src/modules/restaurants/errors/restaurant.errors";
import { MenuItemAllNotInSameRestaurantError, MenuItemNotFoundWithIdError } from "@src/modules/menu/errors/menuItem.errors";
import { CourierModel } from "@src/modules/users/models/courier.models";
import { CustomerModel } from "@src/modules/users/models/customer.models";
import { RestaurantManagerModel } from "@src/modules/users/models/restaurantManager.models";
import { CourierOwnershipError } from '@src/modules/users/errors/courier.errors';
import { ModeratorModel } from '@src/modules/users/models/moderator.models';

export default class OrderService implements IOrderService {

    constructor(
        protected orderGetMapper: IOrderGetMapper,
        protected orderCreateMapper: IOrderCreateMapper,
        protected orderRepository: IOrderRepository,
        protected promocodeRepository: IPromocodeRepository,
        protected menuItemRepository: IMenuItemRepository,
        protected restaurantRepository: IRestaurantRepository,
        protected customer?: CustomerModel,
        protected courier?: CourierModel,
        protected restaurantManager?: RestaurantManagerModel,
        protected moderator?: ModeratorModel
    ) {}

    // public async getOne(id: number): Promise<OrderGetOutputDTO> {
    //     const orderInstance = await this.orderRepository.getOne(id)

    //     if (!orderInstance) {
    //         throw new OrderNotFoundWithIdError(id)
    //     }

    //     return this.orderGetMapper.toDto(orderInstance)
    // }
    
    public async getMany(status?: OrderStatus): Promise<OrderGetOutputDto[]> {

        // Check if user is moderator
        if (!this.moderator) {
            throw new PermissionDeniedError()
        }
        
        const orderInstances = await this.orderRepository.getMany(true, status)
        return orderInstances.map((orderInstance) => this.orderGetMapper.toDto(orderInstance))
    }

    public async getReadyOrders(): Promise<OrderGetOutputDto[]> {

        // Check if user is courier
        if (!this.courier) {
            throw new PermissionDeniedError()
        }

        const orderInstances = await this.orderRepository.getMany(true, "READY")
        return orderInstances.map((orderInstance) => this.orderGetMapper.toDto(orderInstance))
    }

    public async getCurrentCourierOrders(status?: OrderStatus): Promise<OrderGetOutputDto[]> {
        
        // Check if user is courier
        if(!this.courier) {
            throw new PermissionDeniedError()
        }

        const orderInstances = await this.orderRepository.getCourierOrders(this.courier.id, true, status)
        return orderInstances.map((orderInstance) => this.orderGetMapper.toDto(orderInstance))
    }

    public async getCurrentCustomerOrders(status?: OrderStatus): Promise<OrderGetOutputDto[]> {

        // Check if user is customer
        if(!this.customer) {
            throw new PermissionDeniedError()
        }
        
        const orderInstances = await this.orderRepository.getCustomerOrders(this.customer.id, true, status)
        return orderInstances.map((orderInstance) => this.orderGetMapper.toDto(orderInstance))
    }

    public async getRestaurantOrders(restaurantId: bigint, status?: OrderStatus): Promise<OrderGetOutputDto[]> {
        
        // Check if user is restaurant manager
        if(!this.restaurantManager) {
            throw new PermissionDeniedError()
        }

        // Check restaurant for existence
        const restaurantInstance = await this.restaurantRepository.getOne(restaurantId)

        if (!restaurantInstance) {
            throw new RestaurantNotFoundWithIdError(restaurantId)
        }

        // Check if restaurant manager has ownership on restaurant
        if(this.restaurantManager.restaurantId !== restaurantInstance.id) {
            throw new RestaurantManagerOwnershipError(this.restaurantManager.id, restaurantId)
        }

        const orderInstances = await this.orderRepository.getRestaurantOrders(restaurantId, true, status)
        return orderInstances.map((orderInstance) => this.orderGetMapper.toDto(orderInstance))
    }

    public async makeOrder(orderData: OrderCreateInputDto): Promise<OrderCreateOutputDto> {

        // Check if user is customer
        if (!this.customer) {
            throw new PermissionDeniedError()
        }
        
        // Check restaurant for existence

        const restaurantInstance = await this.restaurantRepository.getOne(orderData.restaurantId)

        if (!restaurantInstance){
            throw new RestaurantNotFoundWithIdError(orderData.restaurantId)
        }
        
        // Get unique order items
        const orderItems = [...new Set(orderData.items)]
        
        // Get menu items
        const menuItems = await Promise.all(orderData.items.map(async (orderItem) => {
            const menuItemInstance = await this.menuItemRepository.getOne(orderItem.menuItemId)

            if (!menuItemInstance) {
                throw new MenuItemNotFoundWithIdError(orderItem.menuItemId)
            }

            return menuItemInstance
        }))

        // Check if all menu items are from one restaurant
        const result = menuItems.every((menuItem, index, array) => {
            if (index < array.length - 1) {
                return menuItem.restaurantId === array[index + 1].restaurantId;
            }
            return true;
        });

        if(!result) {
            throw new MenuItemAllNotInSameRestaurantError()
        }
        
        // Calculate total price of order
        const totalPrice = menuItems.reduce((acc, menuItem, index) => {
            const orderItem = orderItems[index]
            return acc + menuItem.price * orderItem.quantity
        }, 0)

        let promocodeName: string | undefined = undefined
        let promocodeDiscount: number | undefined = undefined
        let decountedPrice = totalPrice

        // If order has promocode check it and apply
        if (orderData.promocode){
            const promocodeInstance = await this.promocodeRepository.getOneByName(orderData.promocode)
            
            if(!promocodeInstance) {
                throw new PromocodeNotFoundWithNameError(orderData.promocode)
            }

            if (promocodeInstance.restaurantId !== restaurantInstance.id) {
                throw new PromocodeNotBelongsToRestaurantError(promocodeInstance.id, restaurantInstance.id)
            }

            if (!promocodeInstance.isActive) {
                throw new PromocodeNotActiveError(promocodeInstance.id)
            }

            if (promocodeInstance.currentUsageCount >= promocodeInstance.maxUsageCount) {
                throw new PromocodeAmountUsageError(promocodeInstance.id)
            }

            const currentDate = new Date(Date.now())

            if (currentDate < promocodeInstance.validFrom) {
                throw new PromocodeNotStartUsageError(promocodeInstance.id)
            }

            if (currentDate > promocodeInstance.validUntil) {
                throw new PromocodeExpiredUsageError(promocodeInstance.id)
            }
            
            promocodeName = promocodeInstance.nameIdentifier
            promocodeDiscount = promocodeInstance.discountPercentage
            decountedPrice = totalPrice * (1 - promocodeInstance.discountPercentage / 100)

            await this.promocodeRepository.update(promocodeInstance.id, {
                ...promocodeInstance,
                maxUsageCount: promocodeInstance.maxUsageCount + 1
            })

        }

        // Construct order input
        const orderInput = this.orderCreateMapper.toDbModel(orderData, {
            customerId: this.customer.id,
            supposedDeliveryTime: new Date(Date.now()),
            promocodeName,
            promocodeDiscount,
            totalPrice: totalPrice,
            decountedPrice,
            items: menuItems.map((menuItem) => {
                return {
                    menuItemName: menuItem.name,
                    menuItemImageUrl: menuItem.imageUrl,
                    menuItemPrice: menuItem.price
                }
            })
        })
        
        const orderInstance = await this.orderRepository.create(orderInput)
        return this.orderCreateMapper.toDto(orderInstance)
    }

    public async takeOrder(orderId: bigint): Promise<void> {

        // Check if user is courier
        if (!this.courier) {
            throw new PermissionDeniedError()
        }

        const orderInstance = await this.orderRepository.getOne(orderId)

        if (!orderInstance) {
            throw new OrderNotFoundWithIdError(orderId)
        }

        // Check if order status is READY
        if (orderInstance.status !== "READY") {
            throw new OrderNotReadyError(orderId)
        }

        await this.orderRepository.update(orderId, {
            ...orderInstance,
            courierId: this.courier.id,
            status: "DELIVERING"
        })
    }

    public async finishOrderDelivery(orderId: bigint): Promise<void> {

        // Check if user is courier
        if (!this.courier) {
            throw new PermissionDeniedError()
        }

        const orderInstance = await this.orderRepository.getOne(orderId)

        if (!orderInstance) {
            throw new OrderNotFoundWithIdError(orderId)
        }

        // Check if order status is DELIVERING
        if (orderInstance.status !== "DELIVERING") {
            throw new OrderNotDeliveringError(orderId)
        }

        // Check if courier has ownership on order
        if (orderInstance.courierId !== this.courier.id) {
            throw new CourierOwnershipError(this.courier.id, orderId)
        }

        await this.orderRepository.update(orderId, {
            ...orderInstance,
            status: "DELIVERED"
        })
    }
}