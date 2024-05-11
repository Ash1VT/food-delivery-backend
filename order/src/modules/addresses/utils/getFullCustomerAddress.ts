import { CustomerAddressModel } from "../models/customerAddress.models"

const getFullCustomerAddress = (customerAddress: CustomerAddressModel): string => {
    return `${customerAddress.details}, ${customerAddress.region}, ${customerAddress.country}`
}

export default getFullCustomerAddress