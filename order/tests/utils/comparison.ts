import { MenuItemModel, MenuItemCreateInput, MenuItemUpdateInput } from "@src/modules/menu/models/menuItem.models"
import { OrderModel, OrderCreateInput, OrderUpdateInput } from "@src/modules/orders/models/order.models"
import { OrderItemModel, OrderItemCreateInput, OrderItemUpdateInput, OrderItemWithOrderCreateInput } from "@src/modules/orders/models/orderItem.models"
import { PromocodeModel, PromocodeCreateInput, PromocodeUpdateInput } from "@src/modules/promotions/models/promocode.models"
import { PromotionModel, PromotionCreateInput, PromotionUpdateInput } from "@src/modules/promotions/models/promotion.models"
import { RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput } from "@src/modules/restaurants/models/restaurant.models"
import { CourierModel, CourierCreateInput, CourierUpdateInput } from "@src/modules/users/models/courier.models"
import { CustomerModel, CustomerCreateInput, CustomerUpdateInput } from "@src/modules/users/models/customer.models"
import { ModeratorModel, ModeratorCreateInput, ModeratorUpdateInput } from "@src/modules/users/models/moderator.models"
import { RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput } from "@src/modules/users/models/restaurantManager.models"

// COURIER

// export function compareCourierWithModel(firstCourier: CourierModel, secondCourier: CourierModel): boolean {
//     return firstCourier.id === secondCourier.id && 
//            firstCourier.orders === secondCourier.orders
// }

export function compareCourierWithCreateInput(courier: CourierModel, courierCreateInput: CourierCreateInput): boolean {
    return courier.id === courierCreateInput.id
}

export function compareCourierWithUpdateInput(courier: CourierModel, courierUpdateInput: CourierUpdateInput): boolean {
    return courierUpdateInput.id ? courier.id === courierUpdateInput.id : true
}

// CUSTOMER

// export function compareCustomerWithModel(firstCustomer: CustomerModel, secondCustomer: CustomerModel): boolean {
//     return firstCustomer.id === secondCustomer.id && 
//            firstCustomer.orders === secondCustomer.orders
// }

export function compareCustomerWithCreateInput(customer: CustomerModel, customerCreateInput: CustomerCreateInput): boolean {
    return customer.id === customerCreateInput.id
}

export function compareCustomerWithUpdateInput(customer: CustomerModel, customerUpdateInput: CustomerUpdateInput): boolean {
    return customerUpdateInput.id ? customer.id === customerUpdateInput.id : true
}


// MODERATOR

// export function compareModeratorWithModel(firstModerator: ModeratorModel, secondModerator: ModeratorModel): boolean {
//     return firstModerator.id === secondModerator.id
// }

export function compareModeratorWithCreateInput(moderator: ModeratorModel, moderatorCreateInput: ModeratorCreateInput): boolean {
    return moderator.id === moderatorCreateInput.id
}

export function compareModeratorWithUpdateInput(moderator: ModeratorModel, moderatorUpdateInput: ModeratorUpdateInput): boolean {
    return moderatorUpdateInput.id ? moderator.id === moderatorUpdateInput.id : true
}

// RESTAURANT MANAGER

// export function compareRestaurantManagerWithModel(firstRestaurantManager: RestaurantManagerModel, secondRestaurantManager: RestaurantManagerModel): boolean {
//     return firstRestaurantManager.id === secondRestaurantManager.id && 
//            firstRestaurantManager.restaurantId === secondRestaurantManager.restaurantId
// }

export function compareRestaurantManagerWithCreateInput(restaurantManager: RestaurantManagerModel, restaurantManagerCreateInput: RestaurantManagerCreateInput): boolean {
    return restaurantManager.id === restaurantManagerCreateInput.id &&
           restaurantManagerCreateInput.restaurantId ? restaurantManager.restaurantId === restaurantManagerCreateInput.restaurantId : true
}

export function compareRestaurantManagerWithUpdateInput(restaurantManager: RestaurantManagerModel, restaurantManagerUpdateInput: RestaurantManagerUpdateInput): boolean {
    return restaurantManagerUpdateInput.id ? restaurantManager.id === restaurantManagerUpdateInput.id : true &&
           restaurantManagerUpdateInput.restaurantId ? restaurantManagerUpdateInput.restaurantId === restaurantManager.restaurantId : true
}

// RESTAURANT

// export function compareRestaurantWithModel(firstRestaurant: RestaurantModel, secondRestaurant: RestaurantModel): boolean {
//     return firstRestaurant.id === secondRestaurant.id
// }

export function compareRestaurantWithCreateInput(restaurant: RestaurantModel, restaurantCreateInput: RestaurantCreateInput): boolean {
    return restaurant.id === restaurantCreateInput.id
}

export function compareRestaurantWithUpdateInput(restaurant: RestaurantModel, restaurantUpdateInput: RestaurantUpdateInput): boolean {
    return restaurantUpdateInput.id ? restaurant.id === restaurantUpdateInput.id : true
}

// MENU ITEM

// export function compareMenuItemWithModel(firstMenuItem: MenuItemModel, secondMenuItem: MenuItemModel): boolean {
//     return firstMenuItem.id === secondMenuItem.id && 
//            firstMenuItem.name === secondMenuItem.name &&
//            firstMenuItem.imageUrl === secondMenuItem.imageUrl &&
//            firstMenuItem.price === secondMenuItem.price &&
//            firstMenuItem.restaurantId === secondMenuItem.restaurantId
// }

export function compareMenuItemWithCreateInput(menuItem: MenuItemModel, menuItemCreateInput: MenuItemCreateInput): boolean {
    return menuItem.id === menuItemCreateInput.id &&
           menuItem.name === menuItemCreateInput.name &&
           menuItem.imageUrl === menuItemCreateInput.imageUrl &&
           menuItem.price === menuItemCreateInput.price &&
           menuItem.restaurantId === menuItemCreateInput.restaurantId
}

export function compareMenuItemWithUpdateInput(menuItem: MenuItemModel, menuItemUpdateInput: MenuItemUpdateInput): boolean {
    return menuItemUpdateInput.id ? menuItem.id === menuItemUpdateInput.id : true &&
           menuItemUpdateInput.name ? menuItem.name === menuItemUpdateInput.name : true &&
           menuItemUpdateInput.imageUrl ? menuItem.imageUrl === menuItemUpdateInput.imageUrl : true &&
           menuItemUpdateInput.price ? menuItem.price === menuItemUpdateInput.price : true &&
           menuItemUpdateInput.restaurantId ? menuItem.restaurantId === menuItemUpdateInput.restaurantId : true
}

// PROMOTION

// export function comparePromotionWithModel(firstPromotion: PromotionModel, secondPromotion: PromotionModel): boolean {
//     return firstPromotion.id === secondPromotion.id
// }

export function comparePromotionWithCreateInput(promotion: PromotionModel, promotionCreateInput: PromotionCreateInput): boolean {
    return promotion.id === promotionCreateInput.id
}

export function comparePromotionWithUpdateInput(promotion: PromotionModel, promotionUpdateInput: PromotionUpdateInput): boolean {
    return promotionUpdateInput.id ? promotion.id === promotionUpdateInput.id : true
}

// PROMOCODE

// export function comparePromocodeWithModel(firstPromocode: PromocodeModel, secondPromocode: PromocodeModel): boolean {
//     return firstPromocode.id === secondPromocode.id && 
//            firstPromocode.nameIdentifier === secondPromocode.nameIdentifier &&
//            firstPromocode.discountPercentage === secondPromocode.discountPercentage &&
//            firstPromocode.validFrom === secondPromocode.validFrom &&
//            firstPromocode.validUntil === secondPromocode.validUntil &&
//            firstPromocode.maxUsageCount === secondPromocode.maxUsageCount &&
//            firstPromocode.currentUsageCount === secondPromocode.currentUsageCount &&
//            firstPromocode.restaurantId === secondPromocode.restaurantId &&
//            firstPromocode.isActive === secondPromocode.isActive
// }

export function comparePromocodeWithCreateInput(promocode: PromocodeModel, promocodeCreateInput: PromocodeCreateInput): boolean {
    return promocodeCreateInput.id ? promocode.id === promocodeCreateInput.id : true && 
           promocode.nameIdentifier === promocodeCreateInput.nameIdentifier &&
           promocode.discountPercentage === promocodeCreateInput.discountPercentage &&
           promocode.validFrom === promocodeCreateInput.validFrom &&
           promocode.validUntil === promocodeCreateInput.validUntil &&
           promocode.maxUsageCount === promocodeCreateInput.maxUsageCount &&
           promocodeCreateInput.currentUsageCount ? promocode.currentUsageCount === promocodeCreateInput.currentUsageCount : true &&
           promocode.restaurantId === promocodeCreateInput.restaurantId
}

export function comparePromocodeWithUpdateInput(promocode: PromocodeModel, promocodeUpdateInput: PromocodeUpdateInput): boolean {
    return promocodeUpdateInput.id ? promocode.id === promocodeUpdateInput.id : true && 
           promocodeUpdateInput.nameIdentifier ? promocode.nameIdentifier === promocodeUpdateInput.nameIdentifier : true &&
           promocodeUpdateInput.discountPercentage ? promocode.discountPercentage === promocodeUpdateInput.discountPercentage : true &&
           promocodeUpdateInput.validFrom ? promocode.validFrom === promocodeUpdateInput.validFrom : true &&
           promocodeUpdateInput.validUntil ? promocode.validUntil === promocodeUpdateInput.validUntil : true &&
           promocodeUpdateInput.maxUsageCount ? promocode.maxUsageCount === promocodeUpdateInput.maxUsageCount : true &&
           promocodeUpdateInput.currentUsageCount ? promocode.currentUsageCount === promocodeUpdateInput.currentUsageCount : true &&
           promocodeUpdateInput.restaurantId ? promocode.restaurantId === promocodeUpdateInput.restaurantId : true
}

// ORDER ITEM

// export function compareOrderItemWithModel(firstOrderItem: OrderItemModel, secondOrderItem: OrderItemModel): boolean {
//     return firstOrderItem.id === secondOrderItem.id && 
//            firstOrderItem.orders === secondOrderItem.orders
// }

export function compareOrderItemWithCreateInput(orderItem: OrderItemModel, orderItemCreateInput: OrderItemCreateInput): boolean {
    return orderItemCreateInput.id ? orderItem.id === orderItemCreateInput.id : true &&
           orderItem.menuItemName === orderItemCreateInput.menuItemName && 
           orderItem.menuItemImageUrl === orderItemCreateInput.menuItemImageUrl && 
           orderItem.menuItemPrice === orderItemCreateInput.menuItemPrice && 
           orderItem.orderId === orderItemCreateInput.orderId && 
           orderItem.quantity === orderItemCreateInput.quantity 
}

export function compareOrderItemWithCreateInputWithOrder(orderItem: OrderItemModel, orderItemCreateInput: OrderItemWithOrderCreateInput): boolean {
    return orderItemCreateInput.id ? orderItem.id === orderItemCreateInput.id : true &&
           orderItem.menuItemName === orderItemCreateInput.menuItemName && 
           orderItem.menuItemImageUrl === orderItemCreateInput.menuItemImageUrl && 
           orderItem.menuItemPrice === orderItemCreateInput.menuItemPrice && 
           orderItem.quantity === orderItemCreateInput.quantity 
}

export function compareOrderItemWithUpdateInput(orderItem: OrderItemModel, orderItemUpdateInput: OrderItemUpdateInput): boolean {
    return orderItemUpdateInput.id ? orderItem.id === orderItemUpdateInput.id : true &&
           orderItemUpdateInput.menuItemName ? orderItem.menuItemName === orderItemUpdateInput.menuItemName : true && 
           orderItemUpdateInput.menuItemImageUrl ? orderItem.menuItemImageUrl === orderItemUpdateInput.menuItemImageUrl : true && 
           orderItemUpdateInput.menuItemPrice ? orderItem.menuItemPrice === orderItemUpdateInput.menuItemPrice : true && 
           orderItemUpdateInput.orderId ? orderItem.orderId === orderItemUpdateInput.orderId : true && 
           orderItemUpdateInput.quantity ? orderItem.quantity === orderItemUpdateInput.quantity : true
}

// ORDER

// export function compareOrderWithModel(firstOrder: OrderModel, secondOrder: OrderModel): boolean {
//     return firstOrder.id === secondOrder.id && 
//            firstOrder.orders === secondOrder.orders
// }

export function compareOrderWithCreateInput(order: OrderModel, orderCreateInput: OrderCreateInput): boolean {

    const result = orderCreateInput.id ? order.id === orderCreateInput.id : true &&
                   order.customerId === orderCreateInput.customerId &&
                   orderCreateInput.courierId ? order.courierId === orderCreateInput.courierId : true &&
                   order.restaurantId === orderCreateInput.restaurantId &&
                   orderCreateInput.promocodeName ? order.promocodeName === orderCreateInput.promocodeName : true &&
                   orderCreateInput.promocodeDiscount ? order.promocodeDiscount === orderCreateInput.promocodeDiscount : true &&
                   orderCreateInput.status ? order.status === orderCreateInput.status : true &&
                   orderCreateInput.createdAt ? order.createdAt === orderCreateInput.createdAt : true &&
                   orderCreateInput.deliveryAcceptedAt ? order.deliveryAcceptedAt === orderCreateInput.deliveryAcceptedAt : true &&
                   order.supposedDeliveryTime === orderCreateInput.supposedDeliveryTime &&
                   orderCreateInput.actualDeliveryTime ? order.actualDeliveryTime === orderCreateInput.actualDeliveryTime : true &&
                   orderCreateInput.deliveryFinishedAt ? order.deliveryFinishedAt === orderCreateInput.deliveryFinishedAt : true &&
                   order.totalPrice === orderCreateInput.totalPrice &&
                   order.decountedPrice === orderCreateInput.decountedPrice

    const orderItems = order.items?.sort((a, b) => a.menuItemName.localeCompare(b.menuItemName))
    const orderCreateInputItems = orderCreateInput.items?.create?.sort((a, b) => a.menuItemName.localeCompare(b.menuItemName))

    if (orderCreateInputItems && orderItems) {
        const itemsEquality = orderItems.every((orderItem, index) => compareOrderItemWithCreateInputWithOrder(orderItem, orderCreateInputItems[index]))
        return result && itemsEquality
    }

    return result
}

export function compareOrderWithUpdateInput(order: OrderModel, orderUpdateInput: OrderUpdateInput): boolean {
    return orderUpdateInput.id ? order.id === orderUpdateInput.id : true &&
           orderUpdateInput.id ?  order.customerId === orderUpdateInput.customerId : true &&
           orderUpdateInput.courierId ? order.courierId === orderUpdateInput.courierId : true &&
           orderUpdateInput.id ? order.restaurantId === orderUpdateInput.restaurantId : true &&
           orderUpdateInput.promocodeName ? order.promocodeName === orderUpdateInput.promocodeName : true &&
           orderUpdateInput.promocodeDiscount ? order.promocodeDiscount === orderUpdateInput.promocodeDiscount : true &&
           orderUpdateInput.status ? order.status === orderUpdateInput.status : true &&
           orderUpdateInput.createdAt ? order.createdAt === orderUpdateInput.createdAt : true &&
           orderUpdateInput.deliveryAcceptedAt ? order.deliveryAcceptedAt === orderUpdateInput.deliveryAcceptedAt : true &&
           orderUpdateInput.id ? order.supposedDeliveryTime === orderUpdateInput.supposedDeliveryTime : true &&
           orderUpdateInput.actualDeliveryTime ? order.actualDeliveryTime === orderUpdateInput.actualDeliveryTime : true &&
           orderUpdateInput.deliveryFinishedAt ? order.deliveryFinishedAt === orderUpdateInput.deliveryFinishedAt : true &&
           orderUpdateInput.id ? order.totalPrice === orderUpdateInput.totalPrice : true &&
           orderUpdateInput.id ? order.decountedPrice === orderUpdateInput.decountedPrice : true
}