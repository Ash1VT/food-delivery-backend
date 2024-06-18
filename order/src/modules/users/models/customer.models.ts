import { CustomerAddressModel } from "@src/modules/addresses/models/customerAddress.models";
import { OrderModel } from "../../orders/models/order.models";

export type CustomerModel = {
    id: bigint
    orders?: OrderModel[]
    addresses?: CustomerAddressModel[]
}

export type CustomerCreateInput = {
    id: bigint
}

export type CustomerUpdateInput = {
    id?: bigint
}