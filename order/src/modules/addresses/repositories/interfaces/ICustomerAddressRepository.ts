import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";
import { CustomerAddressModel, CustomerAddressCreateInput, CustomerAddressUpdateInput } from "../../models/customerAddress.models";
import { CustomerAddressApprovalStatus } from "../../models/customerAddressApprovalStatus.models";

export default interface ICustomerAddressRepository extends IBaseRepository<CustomerAddressModel, CustomerAddressCreateInput, CustomerAddressUpdateInput> {
    getCustomerAddresses(customerId: bigint): Promise<CustomerAddressModel[]>
    getCustomersAdresses(status?: CustomerAddressApprovalStatus): Promise<CustomerAddressModel[]>
}