import { OrderModel } from "../../orders/models/order.models";

export type CustomerModel = {
    id: bigint
    orders?: OrderModel[]
}

export type CustomerCreateInput = {
    id: bigint
}

export type CustomerUpdateInput = {
    id?: bigint
}