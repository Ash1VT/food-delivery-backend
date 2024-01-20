import { OrderModel } from "./order";

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