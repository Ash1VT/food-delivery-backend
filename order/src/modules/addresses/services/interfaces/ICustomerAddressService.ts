import IBaseService from "@src/core/services/IBaseService";
import { CustomerAddressCreateInputDto, CustomerAddressCreateOutputDto, CustomerAddressGetOutputDto, CustomerAddressUpdateInputDto, CustomerAddressUpdateOutputDto } from "../../dto/customerAddresses.dto";
import { CustomerAddressApprovalStatus } from "../../models/customerAddressApprovalStatus.models";

export default interface ICustomerAddressService extends IBaseService {
    // Customer
    getCurrentCustomerAddresses(): Promise<CustomerAddressGetOutputDto[]>
    createCustomerAddress(customerAddressData: CustomerAddressCreateInputDto): Promise<CustomerAddressCreateOutputDto>
    deleteCustomerAddress(customerAddressId: bigint): Promise<void>

    // Moderator
    getCustomersAddresses(status?: CustomerAddressApprovalStatus): Promise<CustomerAddressGetOutputDto[]>
    getCustomerAddresses(customerId: bigint): Promise<CustomerAddressGetOutputDto[]>
    updateCustomerAddress(customerAddressId: bigint, customerAddressData: CustomerAddressUpdateInputDto): Promise<CustomerAddressUpdateOutputDto>
    approveCustomerAddress(customerAddressId: bigint): Promise<void>
    rejectCustomerAddress(customerAddressId: bigint): Promise<void>
}