import { OrderModel } from "../../orders/models/order";

export type CourierModel = {
    id: bigint
    orders?: OrderModel[]
}

export type CourierCreateInput = {
    id: bigint
}

export type CourierUpdateInput = {
    id?: bigint
}