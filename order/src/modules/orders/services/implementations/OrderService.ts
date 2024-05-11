import { RestaurantManagerOwnershipError } from '@src/modules/users/errors/restaurantManager.errors';
import { OrderGetOutputDto, OrderCreateInputDto, OrderCreateOutputDto } from "../../dto/order.dto";
import { OrderNotDeliveringError, OrderNotFoundWithIdError, OrderNotPendingError, OrderNotPreparingError, OrderNotReadyError } from "../../errors/order.errors";
import { IOrderCreateMapper, IOrderGetMapper } from "../../mappers/interfaces/order.mappers";
import IOrderRepository from "../../repositories/interfaces/IOrderRepository";
import IOrderService from "../interfaces/IOrderService";
import { OrderStatus } from "../../models/orderStatus.models";
import { PromocodeNotActiveError, PromocodeNotBelongsToRestaurantError, PromocodeNotFoundWithNameError, PromocodeAmountUsageError, PromocodeExpiredUsageError, PromocodeNotStartUsageError } from "@src/modules/promotions/errors/promocode.errors";
import { PermissionDeniedError } from "@src/modules/users/errors/permissions.errors";
import IPromocodeRepository from "@src/modules/promotions/repositories/interfaces/IPromocodeRepository";
import IMenuItemRepository from "@src/modules/menu/repositories/interfaces/IMenuItemRepository";
import IRestaurantRepository from "@src/modules/restaurants/repositories/interfaces/IRestaurantRepository";
import { RestaurantNotActiveError, RestaurantNotFoundWithIdError, RestaurantNotWorkingError } from "@src/modules/restaurants/errors/restaurant.errors";
import { CourierOwnershipError } from '@src/modules/users/errors/courier.errors';
import BaseService from '@src/core/services/BaseService';
import ICustomerAddressRepository from '@src/modules/addresses/repositories/interfaces/ICustomerAddressRepository';
import { CustomerAddressOwnershipError } from '@src/modules/users/errors/customer.errors';
import IDeliveryInformationRepository from '../../repositories/interfaces/IDeliveryInformationRepository';
import getFullCustomerAddress from '@src/modules/addresses/utils/getFullCustomerAddress';
import { DeliveryType } from '../../models/deliveryType.models';
import getRoute from '@src/api/bingMaps/getRoute';
import moment from 'moment';
import { DeliveryInformationModel } from '../../models/deliveryInformation.models';
import { CustomerAddressNotApprovedError } from '@src/modules/addresses/errors/customerAddress.errors';
import { MenuItemNotFoundWithIdError, MenuItemAllNotInSameRestaurantError } from '@src/modules/menu/errors/menuItem.errors';
import IWorkingHoursRepository from '@src/modules/restaurants/repositories/interfaces/IWorkingHours';
import { publisher } from '@src/core/setup/kafka/publisher';
import { OrderFinishedEvent } from '../../producer/events/order.events';
import { getDayOfWeek } from '../../utils/daysOfWeek';

export default class OrderService extends BaseService implements IOrderService {

    constructor(
        protected orderGetMapper: IOrderGetMapper,
        protected orderCreateMapper: IOrderCreateMapper,
        protected orderRepository: IOrderRepository,
        protected promocodeRepository: IPromocodeRepository,
        protected customerAddressRepository: ICustomerAddressRepository,
        protected deliveryInformationRepository: IDeliveryInformationRepository,
        protected menuItemRepository: IMenuItemRepository,
        protected restaurantRepository: IRestaurantRepository,
        protected workingHoursRepository: IWorkingHoursRepository,
        protected bingApiKey: string
    ) {
        super()
    }
    
    public async getMany(status?: OrderStatus): Promise<OrderGetOutputDto[]> {

        // Check if user is moderator
        if (!this.moderator) {
            throw new PermissionDeniedError()
        }
        
        const orderInstances = await this.orderRepository.getMany(true, true, status)
        return orderInstances.map((orderInstance) => this.orderGetMapper.toDto(orderInstance))
    }

    public async getReadyOrders(): Promise<OrderGetOutputDto[]> {

        // Check if user is courier
        if (!this.courier) {
            throw new PermissionDeniedError()
        }

        const orderInstances = await this.orderRepository.getMany(true, true, "READY")
        return orderInstances.map((orderInstance) => this.orderGetMapper.toDto(orderInstance))
    }

    public async getCurrentCourierOrders(status?: OrderStatus): Promise<OrderGetOutputDto[]> {
        
        // Check if user is courier
        if(!this.courier) {
            throw new PermissionDeniedError()
        }

        const orderInstances = await this.orderRepository.getCourierOrders(this.courier.id, true, true, status)
        return orderInstances.map((orderInstance) => this.orderGetMapper.toDto(orderInstance))
    }

    public async getCurrentCustomerOrders(status?: OrderStatus): Promise<OrderGetOutputDto[]> {

        // Check if user is customer
        if(!this.customer) {
            throw new PermissionDeniedError()
        }
        
        const orderInstances = await this.orderRepository.getCustomerOrders(this.customer.id, true, true, status)
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

        const orderInstances = await this.orderRepository.getRestaurantOrders(restaurantId, true, true, status)
        return orderInstances.map((orderInstance) => this.orderGetMapper.toDto(orderInstance))
    }

    public async confirmOrder(orderId: bigint): Promise<void> {
        
        // Check if user is moderator
        if (!this.moderator) {
            throw new PermissionDeniedError()
        }

        // Check if order exists
        const orderInstance = await this.orderRepository.getOne(orderId)

        if (!orderInstance) {
            throw new OrderNotFoundWithIdError(orderId)
        }

        // Check if order is pending
        if (orderInstance.status !== "PENDING") {
            throw new OrderNotPendingError(orderId)
        }

        // Update order
        await this.orderRepository.update(orderId, {
            ...orderInstance,
            status: "PREPARING"
        })

    }

    public async prepareOrder(orderId: bigint): Promise<void> {
        
        // Check if user is restaurant manager
        if (!this.restaurantManager) {
            throw new PermissionDeniedError()
        }

        // Check if order exists
        const orderInstance = await this.orderRepository.getOne(orderId)

        if (!orderInstance) {
            throw new OrderNotFoundWithIdError(orderId)
        }

        // Check if manager has ownership on order
        if (this.restaurantManager.restaurantId !== orderInstance.restaurantId) {
            throw new RestaurantManagerOwnershipError(this.restaurantManager.id, orderInstance.restaurantId)
        }

        // Check if order is preparing
        if (orderInstance.status !== "PREPARING") {
            throw new OrderNotPreparingError(orderId)
        }

        // Update order
        await this.orderRepository.update(orderId, {
            ...orderInstance,
            status: "READY"
        })

    }

    public async cancelOrder(orderId: bigint): Promise<void> {
        // Check if user is moderator
        if (!this.moderator) {
            throw new PermissionDeniedError()
        }

        // Check if order exists
        const orderInstance = await this.orderRepository.getOne(orderId)

        if (!orderInstance) {
            throw new OrderNotFoundWithIdError(orderId)
        }

        // Check if order is pending
        if (orderInstance.status !== "PENDING") {
            throw new OrderNotPendingError(orderId)
        }

        // Update order
        await this.orderRepository.update(orderId, {
            ...orderInstance,
            status: "CANCELLED"
        })
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

        // Check if restaurant is active
        if (!restaurantInstance.isActive) {
            throw new RestaurantNotActiveError(orderData.restaurantId)
        }

        // Check if customer has ownership on address
        const customerAddresses = await this.customerAddressRepository.getCustomerAddresses(this.customer.id)

        const customerAddress = customerAddresses.find((address) => address.id === orderData.customerAddressId)

        if (!customerAddress) {
            throw new CustomerAddressOwnershipError(this.customer.id, orderData.customerAddressId)
        }

        // Check if customer address is approved
        if (customerAddress.approvalStatus !== "APPROVED") {
            throw new CustomerAddressNotApprovedError(orderData.customerAddressId)
        }

        const currentDate = new Date(Date.now())

        // Check if restaurant is open
        const currentDayOfWeek = getDayOfWeek(currentDate.getDay())

        const workingHours = await this.workingHoursRepository.getRestaurantWorkingHours(restaurantInstance.id, currentDayOfWeek)

        if (!workingHours) {
            throw new RestaurantNotWorkingError(restaurantInstance.id)
        }

        if (!isTimeBetween(currentDate, workingHours.openingTime, workingHours.closingTime)) {
            throw new RestaurantNotWorkingError(restaurantInstance.id)
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

        // Create delivery information
        const deliveryInformationInstance = await this.deliveryInformationRepository.create({
            originAddress: restaurantInstance.address,
            destinationAddress: getFullCustomerAddress(customerAddress)
        })

        // Construct order input
        const orderInput = this.orderCreateMapper.toDbModel(orderData, {
            customerId: this.customer.id,
            promocodeName,
            promocodeDiscount,
            deliveryInformationId: deliveryInformationInstance.id,
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

    public async takeOrder(orderId: bigint, deliveryType: DeliveryType): Promise<void> {

        // Check if user is courier
        if (!this.courier) {
            throw new PermissionDeniedError()
        }

        // Check if order exists
        const orderInstance = await this.orderRepository.getOne(orderId, false, true)

        if (!orderInstance) {
            throw new OrderNotFoundWithIdError(orderId)
        }

        // Check if order status is READY
        if (orderInstance.status !== "READY") {
            throw new OrderNotReadyError(orderId)
        }

        const deliveryInformation = orderInstance.deliveryInformation as DeliveryInformationModel

        // Get delivery route information
        const routeInformation = await getRoute(deliveryType, deliveryInformation.originAddress, deliveryInformation.destinationAddress, this.bingApiKey)

        // Update order delivery information
        await this.deliveryInformationRepository.update(orderInstance.deliveryInformationId, {
            deliveryType,
            deliveryDistance: routeInformation?.travelDistance,
            supposedDeliveryTime: routeInformation?.travelDuration,
            deliveryAcceptedAt: new Date(Date.now()),
        })

        // Update order
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

        // Check if order exists
        const orderInstance = await this.orderRepository.getOne(orderId, false, true)

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

        // Calculate actual delivery time
        const deliveryInformation = orderInstance.deliveryInformation as DeliveryInformationModel

        const deliveryFinishedAt = new Date(Date.now())
        const actualDeliveryTime = moment(deliveryFinishedAt).diff(deliveryInformation.deliveryAcceptedAt, "seconds")

        // Update order delivery information
        await this.deliveryInformationRepository.update(orderInstance.deliveryInformationId, {
            deliveryFinishedAt,
            actualDeliveryTime
        })

        // Update order
        await this.orderRepository.update(orderId, {
            ...orderInstance,
            status: "DELIVERED"
        })

        // Publish event that order is finished
        publisher.publish(new OrderFinishedEvent({
            id: orderInstance.id
        }))
    }
}