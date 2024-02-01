import { RestaurantManagerOwnershipError } from './../../../users/errors/restaurantManager';
import { OrderGetOutputDTO, OrderCreateInputDTO, OrderCreateOutputDTO } from "../../dto/order";
import { OrderCourierOwnershipError, OrderNotDeliveringError, OrderNotFoundWithIdError, OrderNotReadyError } from "../../errors/order";
import { IOrderCreateMapper, IOrderGetMapper } from "../../mappers/interfaces/order";
import IOrderRepository from "../../repositories/interfaces/IOrderRepository";
import IOrderService from "../interfaces/IOrderService";
import { mapManyModels } from "@src/utils/mapManyModels";
import { OrderStatus } from "../../models/orderStatus";
import { PromocodeNotActiveError, PromocodeNotFoundWithNameError, PromocodeUsageError } from "@src/modules/promotions/errors/promocode";
import { PermissionDeniedError } from "@src/modules/users/errors/permissions";
import IPromocodeRepository from "@src/modules/promotions/repositories/interfaces/IPromocodeRepository";
import IMenuItemRepository from "@src/modules/menu/repositories/interfaces/IMenuItemRepository";
import IRestaurantRepository from "@src/modules/restaurants/repositories/interfaces/IRestaurantRepository";
import { RestaurantNotFoundWithIdError } from "@src/modules/restaurants/errors/restaurant";
import { MenuItemNotFoundWithIdError } from "@src/modules/menu/errors/menuItem";
import { CourierModel } from "@src/modules/users/models/courier";
import { CustomerModel } from "@src/modules/users/models/customer";
import { RestaurantManagerModel } from "@src/modules/users/models/restaurantManager";
import { RestaurantManagerMissingRestaurantError } from "@src/modules/users/errors/restaurantManager";

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
        protected restaurantManager?: RestaurantManagerModel
    ) {}

    public async getOne(id: number): Promise<OrderGetOutputDTO> {
        const orderInstance = await this.orderRepository.getOne(id)

        if (!orderInstance) {
            throw new OrderNotFoundWithIdError(id)
        }

        return this.orderGetMapper.toDto(orderInstance)
    }
    
    public async getMany(status?: OrderStatus): Promise<OrderGetOutputDTO[]> {
        const orderInstances = await this.orderRepository.getMany(true, status)
        return mapManyModels(orderInstances, this.orderGetMapper.toDto)
    }

    public async getReadyOrders(): Promise<OrderGetOutputDTO[]> {
        const orderInstances = await this.orderRepository.getMany(true, "READY")
        return mapManyModels(orderInstances, this.orderGetMapper.toDto)
    }

    public async getCurrentCourierOrders(status?: OrderStatus): Promise<OrderGetOutputDTO[]> {
        
        // Check if user is courier
        if(!this.courier) {
            throw new PermissionDeniedError()
        }

        const courierId = Number(this.courier.id)

        const orderInstances = await this.orderRepository.getCourierOrders(courierId, true, status)
        return mapManyModels(orderInstances, this.orderGetMapper.toDto)
    }

    public async getCurrentCustomerOrders(status?: OrderStatus): Promise<OrderGetOutputDTO[]> {

        // Check if user is customer
        if(!this.customer) {
            throw new PermissionDeniedError()
        }
        
        const customerId = Number(this.customer.id)

        const orderInstances = await this.orderRepository.getCustomerOrders(customerId, true, status)
        return mapManyModels(orderInstances, this.orderGetMapper.toDto)
    }

    public async getRestaurantOrders(restaurantId: number, status?: OrderStatus): Promise<OrderGetOutputDTO[]> {
        
        // Check if user is restaurant manager
        if(!this.restaurantManager) {
            throw new PermissionDeniedError()
        }

        // Check if restaurant manager has restaurant
        // if(!this.restaurantManager.restaurantId){
        //     throw new RestaurantManagerMissingRestaurantError()
        // }

        // Check if restaurant manager has ownership on restaurant
        if(Number(this.restaurantManager.restaurantId) !== restaurantId) {
            throw new RestaurantManagerOwnershipError(this.restaurantManager.id, restaurantId)
        }

        const orderInstances = await this.orderRepository.getRestaurantOrders(restaurantId, true, status)
        return mapManyModels(orderInstances, this.orderGetMapper.toDto)
    }

    public async makeOrder(orderData: OrderCreateInputDTO): Promise<OrderCreateOutputDTO> {

        // Check if user is customer
        if (!this.customer) {
            throw new PermissionDeniedError()
        }
        
        // Check restaurant for existence
        if (!this.restaurantRepository.exists(orderData.restaurantId)){
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
        // const result = menuItems.every((menuItem, index, array) => {
        //     if (index < array.length - 1) {
        //         return menuItem.restaurantId === array[index + 1].restaurantId;
        //     }
        //     return true;
        // });

        // if(!result) {

        // }
        
        // Calculate total price of order
        const totalPrice = menuItems.reduce((acc, menuItem, index) => {
            const orderItem = orderItems[index]
            return acc + menuItem.price * orderItem.quantity
        }, 0)
        
        // Construct order input
        const orderInput = this.orderCreateMapper.toDbModel(orderData, {
            customerId: this.customer.id,
            supposedDeliveryTime: new Date(Date.now()),
            totalPrice: totalPrice,
            decountedPrice: totalPrice,
            itemsAdditionalData: menuItems.map((menuItem) => {
                return {
                    menuItemName: menuItem.name,
                    menuItemImageUrl: menuItem.imageUrl,
                    menuItemPrice: menuItem.price
                }
            })
        })

        // If order has promocode check it and apply
        if (orderData.promocode){
            const promocodeInstance = await this.promocodeRepository.getOneByName(orderData.promocode)
            
            if(!promocodeInstance) {
                throw new PromocodeNotFoundWithNameError(orderData.promocode)
            }
            
            const promocodeId = Number(promocodeInstance.id)

            if (!promocodeInstance.isActive) {
                throw new PromocodeNotActiveError(promocodeId)
            }

            if (promocodeInstance.maxUsageCount >= promocodeInstance.currentUsageCount) {
                throw new PromocodeUsageError(promocodeId)
            }
            
            orderInput.promocodeName = promocodeInstance.nameIdentifier
            orderInput.promocodeDiscount = promocodeInstance.discountPercentage
            orderInput.decountedPrice = orderInput.totalPrice * (1 - promocodeInstance.discountPercentage / 100)

            await this.promocodeRepository.update(promocodeId, {
                ...promocodeInstance,
                maxUsageCount: promocodeInstance.maxUsageCount + 1
            })

        }

        const orderInstance = await this.orderRepository.create(orderInput)
        return this.orderCreateMapper.toDto(orderInstance)
    }

    public async takeOrder(orderId: number): Promise<void> {

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

    public async finishOrderDelivery(orderId: number): Promise<void> {

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
            throw new OrderCourierOwnershipError(orderId)
        }

        await this.orderRepository.update(orderId, {
            ...orderInstance,
            status: "DELIVERED"
        })
    }
}