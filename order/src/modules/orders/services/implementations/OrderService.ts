import { RestaurantManagerOwnershipError } from '@src/modules/users/errors/restaurantManager.errors';
import { OrderGetOutputDto, OrderCreateInputDto, OrderCreateOutputDto, OrderUpdateInputDto, OrderUpdateOutputDto } from "../../dto/order.dto";
import { OrderHasNoDestinationAddressError, OrderNotDeliveringError, OrderNotFoundWithIdError, OrderNotPendingError, OrderNotPlacingError, OrderNotPreparingError, OrderNotReadyError } from "../../errors/order.errors";
import { IOrderCreateMapper, IOrderGetMapper, IOrderUpdateMapper } from "../../mappers/interfaces/order.mappers";
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
import { CustomerAddressOwnershipError, CustomerOrderOwnershipError } from '@src/modules/users/errors/customer.errors';
import IDeliveryInformationRepository from '../../repositories/interfaces/IDeliveryInformationRepository';
import getFullCustomerAddress from '@src/modules/addresses/utils/getFullCustomerAddress';
import { DeliveryType } from '../../models/deliveryType.models';
import getRoute from '@src/api/bingMaps/getRoute';
import moment from 'moment';
import { DeliveryInformationModel, DeliveryInformationUpdateInput } from '../../models/deliveryInformation.models';
import { CustomerAddressNotApprovedError, CustomerAddressNotFoundWithIdError } from '@src/modules/addresses/errors/customerAddress.errors';
import { MenuItemNotFoundWithIdError, MenuItemAllNotInSameRestaurantError } from '@src/modules/menu/errors/menuItem.errors';
import { publisher } from '@src/core/setup/kafka/publisher';
import { OrderFinishedEvent } from '../../producer/events/order.events';
import { getDayOfWeek } from '../../utils/daysOfWeek';
import IWorkingHoursRepository from '@src/modules/restaurants/repositories/interfaces/IWorkingHoursRepository';
import { PromocodeModel } from '@src/modules/promotions/models/promocode.models';
import { CustomerModel } from '@src/modules/users/models/customer.models';
import { CustomerAddressModel } from '@src/modules/addresses/models/customerAddress.models';
import IPriceInformationRepository from '../../repositories/interfaces/IPriceInformationRepository';
import getCoordinates from '@src/api/bingMaps/getCoordinates';
import getAcrossDistance from '../../utils/getAcrossDistance';
import { PriceInformationModel, PriceInformationUpdateInput } from '../../models/priceInformation.models';
import { calculateOrderPrice } from '../../utils/price';
import { OrderModel } from '../../models/order.models';

export default class OrderService extends BaseService implements IOrderService {

    constructor(
        protected orderGetMapper: IOrderGetMapper,
        protected orderCreateMapper: IOrderCreateMapper,
        protected orderUpdateMapper: IOrderUpdateMapper,
        protected orderRepository: IOrderRepository,
        protected promocodeRepository: IPromocodeRepository,
        protected customerAddressRepository: ICustomerAddressRepository,
        protected deliveryInformationRepository: IDeliveryInformationRepository,
        protected priceInformationRepository: IPriceInformationRepository,
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
        
        const orderInstances = await this.orderRepository.getMany(true, true, true, status)
        return orderInstances.map((orderInstance) => this.orderGetMapper.toDto(orderInstance))
    }

    public async getReadyOrders(): Promise<OrderGetOutputDto[]> {

        // Check if user is courier
        if (!this.courier) {
            throw new PermissionDeniedError()
        }

        const orderInstances = await this.orderRepository.getMany(true, true, true, "READY")
        return orderInstances.map((orderInstance) => this.orderGetMapper.toDto(orderInstance))
    }

    public async getCurrentCourierOrders(status?: OrderStatus): Promise<OrderGetOutputDto[]> {
        
        // Check if user is courier
        if(!this.courier) {
            throw new PermissionDeniedError()
        }

        const orderInstances = await this.orderRepository.getCourierOrders(this.courier.id, true, true, true, status)
        return orderInstances.map((orderInstance) => this.orderGetMapper.toDto(orderInstance))
    }

    public async getCurrentCustomerOrders(status?: OrderStatus): Promise<OrderGetOutputDto[]> {

        // Check if user is customer
        if(!this.customer) {
            throw new PermissionDeniedError()
        }
        
        const orderInstances = await this.orderRepository.getCustomerOrders(this.customer.id, true, true, true, status)
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

        const orderInstances = await this.orderRepository.getRestaurantOrders(restaurantId, true, true, true, status)
        return orderInstances.map((orderInstance) => this.orderGetMapper.toDto(orderInstance))
    }

    public async confirmOrder(orderId: bigint): Promise<OrderUpdateOutputDto> {
        
        // Check if user is moderator
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

        // Check if order is pending
        if (orderInstance.status !== "PENDING") {
            throw new OrderNotPendingError(orderId)
        }

        // Update order
        const updatedOrder = await this.orderRepository.update(orderId, {
            ...orderInstance,
            status: "PREPARING"
        }) as OrderModel

        return this.orderUpdateMapper.toDto(updatedOrder)
    }

    public async prepareOrder(orderId: bigint): Promise<OrderUpdateOutputDto> {
        
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
        const updatedOrder = await this.orderRepository.update(orderId, {
            ...orderInstance,
            status: "READY"
        }) as OrderModel

        return this.orderUpdateMapper.toDto(updatedOrder)
    }

    public async cancelOrder(orderId: bigint): Promise<OrderUpdateOutputDto> {
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
        const updatedOrder = await this.orderRepository.update(orderId, {
            ...orderInstance,
            status: "CANCELLED"
        }) as OrderModel

        return this.orderUpdateMapper.toDto(updatedOrder)
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

        // const customerAddress = await this.checkCustomerAddress(orderData.customerAddressId, this.customer)

        // const currentDate = new Date(Date.now())

        // Check if restaurant is open
        // const currentDayOfWeek = getDayOfWeek(currentDate.getDay())

        // const workingHours = await this.workingHoursRepository.getRestaurantWorkingHours(restaurantInstance.id, currentDayOfWeek)

        // if (!workingHours) {
        //     throw new RestaurantNotWorkingError(restaurantInstance.id)
        // }

        // if (!isTimeBetween(currentDate, workingHours.openingTime, workingHours.closingTime)) {
        //     throw new RestaurantNotWorkingError(restaurantInstance.id)
        // }

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
        
        // Calculate price of order items
        const orderItemsPrice = menuItems.reduce((acc, menuItem, index) => {
            const orderItem = orderItems[index]
            return acc + menuItem.price * orderItem.quantity
        }, 0)

        // let promocodeName: string | undefined = undefined
        // let promocodeDiscount: number | undefined = undefined
        // let decountedPrice = totalPrice

        // If order has promocode check it and apply
        // if (orderData.promocode){
        //     const promocodeInstance = await this.checkPromocode(orderData.promocode, restaurantInstance.id, currentDate)
            
        //     promocodeName = promocodeInstance.nameIdentifier
        //     promocodeDiscount = promocodeInstance.discountPercentage
        //     decountedPrice = totalPrice * (1 - promocodeInstance.discountPercentage / 100)

        //     await this.promocodeRepository.update(promocodeInstance.id, {
        //         ...promocodeInstance,
        //         maxUsageCount: promocodeInstance.maxUsageCount + 1
        //     })

        // }

        // Create delivery information
        const deliveryInformationInstance = await this.deliveryInformationRepository.create({
            originAddress: restaurantInstance.address
        })

        // Create price information
        const priceInformationInstance = await this.priceInformationRepository.create({
            orderItemsPrice: orderItemsPrice,
            totalPrice: orderItemsPrice,
            decountedPrice: orderItemsPrice,
        })

        // Construct order input
        const orderInput = this.orderCreateMapper.toDbModel(orderData, {
            customerId: this.customer.id,
            deliveryInformationId: deliveryInformationInstance.id,
            priceInformationId: priceInformationInstance.id,
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

    public async updateOrder(orderId: bigint, orderData: OrderUpdateInputDto): Promise<OrderUpdateOutputDto> {
        // Check if user is customer
        if (!this.customer) {
            throw new PermissionDeniedError()
        }

        let orderInstance = await this.orderRepository.getOne(orderId, true, true, true)

        // Check if order exists
        if (!orderInstance) {
            throw new OrderNotFoundWithIdError(orderId)
        }

        // Check if order belongs to customer
        if (orderInstance.customerId !== this.customer.id) {
            throw new CustomerOrderOwnershipError(this.customer.id, orderInstance.id)
        }

        const deliveryInformation = orderInstance.deliveryInformation as DeliveryInformationModel
        const priceInformation = orderInstance.priceInformation as PriceInformationModel

        if (!(orderData.customerAddressId || orderData.promocodeName)) {
            return this.orderUpdateMapper.toDto(orderInstance)
        }

        let deliveryInformationUpdateInput: DeliveryInformationUpdateInput = {}
        let priceInformationUpdateInput: PriceInformationUpdateInput = {}
        
        if (orderData.customerAddressId) {
            const customerAddress = await this.checkCustomerAddress(orderData.customerAddressId, this.customer)
            const fullCustomerAddress = getFullCustomerAddress(customerAddress)

            // Calculate delivery distance
            const originPointCoordinates = await getCoordinates(deliveryInformation.originAddress, this.bingApiKey)
            const destinationPointCoordinates = await getCoordinates(fullCustomerAddress, this.bingApiKey)

            if (!originPointCoordinates || !destinationPointCoordinates) {
                throw new Error("Failed to calculate delivery distance")
            }

            const distance = getAcrossDistance(originPointCoordinates, destinationPointCoordinates)

            // Calculate delivery price

            const deliveryPrice = distance * 0.1

            deliveryInformationUpdateInput = {
                ...deliveryInformationUpdateInput,
                originAddress: fullCustomerAddress,
            }

            priceInformationUpdateInput = {
                ...priceInformationUpdateInput,
                deliveryPrice,
                totalPrice: priceInformation.totalPrice + deliveryPrice
            }
        }

        if (orderData.promocodeName) {
            const promocodeInstance = await this.checkPromocode(orderData.promocodeName, orderInstance.restaurantId, new Date(Date.now()))
            const deliveryPrice = priceInformationUpdateInput.deliveryPrice ? priceInformationUpdateInput.deliveryPrice : priceInformation.deliveryPrice

            const orderPrice = calculateOrderPrice(priceInformation.orderItemsPrice, promocodeInstance.discountPercentage, deliveryPrice)

            priceInformationUpdateInput = {
                ...priceInformationUpdateInput,
                promocodeName: promocodeInstance.nameIdentifier,
                promocodeDiscount: promocodeInstance.discountPercentage,
                decountedPrice: orderPrice.decountedPrice,
                totalPrice: orderPrice.totalPrice
            }
        }

        const updatedDeliveryInformation = await this.deliveryInformationRepository.update(orderInstance.deliveryInformationId, deliveryInformationUpdateInput) as DeliveryInformationModel
        const updatedPriceInformation = await this.priceInformationRepository.update(orderInstance.priceInformationId, priceInformationUpdateInput) as PriceInformationModel
        
        orderInstance.deliveryInformation = updatedDeliveryInformation
        orderInstance.priceInformation = updatedPriceInformation

        return this.orderUpdateMapper.toDto(orderInstance)
    }

    public async placeOrder(orderId: bigint): Promise<OrderUpdateOutputDto> {

        // Check if user is customer
        if (!this.customer) {
            throw new PermissionDeniedError()
        }

        const orderInstance = await this.orderRepository.getOne(orderId, true, true, true)

        // Check if order exists
        if (!orderInstance) {
            throw new OrderNotFoundWithIdError(orderId)
        }

        // Check if order belongs to customer
        if (orderInstance.customerId !== this.customer.id) {
            throw new CustomerOrderOwnershipError(this.customer.id, orderInstance.id)
        }

        // Check if order status is PLACING
        if (orderInstance.status !== "PLACING") {
            throw new OrderNotPlacingError(orderId)
        }

        // Check if order has destination address
        const deliveryInformation = orderInstance.deliveryInformation as DeliveryInformationModel
        if (!deliveryInformation.destinationAddress) {
            throw new OrderHasNoDestinationAddressError(orderId)
        }

        // Update order status to PENDING
        await this.orderRepository.update(orderInstance.id, {
            status: "PENDING"
        })

        return this.orderUpdateMapper.toDto(orderInstance)
    }

    public async takeOrder(orderId: bigint, deliveryType: DeliveryType): Promise<OrderUpdateOutputDto> {

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
        const originAddress = deliveryInformation.originAddress
        const destinationAddress = deliveryInformation.destinationAddress as string

        // Get delivery route information
        const routeInformation = await getRoute(deliveryType, originAddress, destinationAddress, this.bingApiKey)

        // Update order delivery information
        await this.deliveryInformationRepository.update(orderInstance.deliveryInformationId, {
            deliveryType,
            deliveryDistance: routeInformation?.travelDistance,
            supposedDeliveryTime: routeInformation?.travelDuration,
            deliveryAcceptedAt: new Date(Date.now()),
        })

        // Update order
        const updatedOrder = await this.orderRepository.update(orderId, {
            ...orderInstance,
            courierId: this.courier.id,
            status: "DELIVERING"
        }) as OrderModel

        return this.orderUpdateMapper.toDto(updatedOrder)
    }

    public async finishOrderDelivery(orderId: bigint): Promise<OrderUpdateOutputDto> {

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
        const updatedOrder = await this.orderRepository.update(orderId, {
            ...orderInstance,
            status: "DELIVERED"
        }) as OrderModel

        // Publish event that order is finished
        publisher.publish(new OrderFinishedEvent({
            id: orderInstance.id,
            customerId: orderInstance.customerId,
            courierId: orderInstance.courierId
        }))

        return this.orderUpdateMapper.toDto(updatedOrder)
    }

    protected async checkPromocode(promocodeName: string, restaurantId: bigint, currentDate: Date): Promise<PromocodeModel> {
        const promocodeInstance = await this.promocodeRepository.getOneByName(promocodeName)
            
        if(!promocodeInstance) {
            throw new PromocodeNotFoundWithNameError(promocodeName)
        }

        if (promocodeInstance.restaurantId !== restaurantId) {
            throw new PromocodeNotBelongsToRestaurantError(promocodeInstance.id, restaurantId)
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

        return promocodeInstance
    }

    protected async checkCustomerAddress(customerAddressId: bigint, customer: CustomerModel): Promise<CustomerAddressModel> {
        const customerAddress = await this.customerAddressRepository.getOne(customerAddressId)

        // Check if customer address exists
        if (!customerAddress) {
            throw new CustomerAddressNotFoundWithIdError(customerAddressId)
        }

        // Check if customer has ownership on address
        if (customerAddress.customerId !== customer.id) {
            throw new CustomerAddressOwnershipError(customer.id, customerAddressId)
        }

        // Check if customer address is approved
        if (customerAddress.approvalStatus !== "APPROVED") {
            throw new CustomerAddressNotApprovedError(customerAddressId)
        }

        return customerAddress
    }
}