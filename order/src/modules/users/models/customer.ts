import { OrderModel } from "../../orders/models/order";

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