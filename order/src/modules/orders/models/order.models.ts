import { DeliveryInformationModel } from "./deliveryInformation.models";
import { OrderItemModel, OrderItemWithOrderCreateInput } from "./orderItem.models";
import { OrderStatus } from "./orderStatus.models";
import { PaymentInformationModel } from "./paymentInformation.models";
import { PriceInformationModel } from "./priceInformation.models";

export type OrderModel = {
    id: bigint
    customerId: bigint
    courierId?: bigint | null
    restaurantId: bigint
    deliveryInformationId: bigint
    priceInformationId: bigint
    paymentInformationId: bigint
    status: OrderStatus
    createdAt: Date
    items?: OrderItemModel[]
    deliveryInformation?: DeliveryInformationModel
    priceInformation?: PriceInformationModel
    paymentInformation?: PaymentInformationModel
}

export type OrderCreateInput = {
    id?: bigint
    customerId: bigint
    courierId?: bigint
    restaurantId: bigint
    deliveryInformationId: bigint
    priceInformationId: bigint
    paymentInformationId: bigint
    status?: OrderStatus
    createdAt?: Date
    items?: {
        create?: OrderItemWithOrderCreateInput[]
    }
}

export type OrderUpdateInput = {
    id?: bigint
    customerId?: bigint
    courierId?: bigint | null
    restaurantId?: bigint
    deliveryInformationId?: bigint
    priceInformationId?: bigint
    paymentInformationId?: bigint
    status?: OrderStatus
    createdAt?: Date
}