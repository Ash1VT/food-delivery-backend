import BaseService from "@src/core/services/BaseService";
import ICustomerAddressService from "../interfaces/ICustomerAddressService";
import { ICustomerAddressGetMapper, ICustomerAddressCreateMapper } from "../../mappers/interfaces/customerAddress.mappers";
import ICustomerAddressRepository from "../../repositories/interfaces/ICustomerAddressRepository";
import { CustomerAddressCreateInputDto, CustomerAddressCreateOutputDto, CustomerAddressGetOutputDto } from "../../dto/customerAddresses.dto";
import { PermissionDeniedError } from "@src/modules/users/errors/permissions.errors";
import ICustomerRepository from "@src/modules/users/repositories/interfaces/ICustomerRepository";
import { CustomerAddressOwnershipError, CustomerNotFoundWithIdError } from "@src/modules/users/errors/customer.errors";
import { CustomerAddressNotFoundWithIdError } from "../../errors/customerAddress.errors";
import { CustomerAddressApprovalStatus } from "../../models/customerAddressApprovalStatus.models";

export default class CustomerAddressService extends BaseService implements ICustomerAddressService {

    constructor(
        protected customerAddressGetMapper: ICustomerAddressGetMapper,
        protected customerAddressCreateMapper: ICustomerAddressCreateMapper,
        protected customerAddressRepository: ICustomerAddressRepository,
        protected customerRepository: ICustomerRepository
    ) {
        super()
    }

    public async getCurrentCustomerAddresses(): Promise<CustomerAddressGetOutputDto[]> {
        // Check if customer is authenticated
        if (!this.customer) {
            throw new PermissionDeniedError()
        }

        // Get customer addresses
        const customerAddressesInstances = await this.customerAddressRepository.getCustomerAddresses(this.customer.id)
        return customerAddressesInstances.map(customerAddressInstance => this.customerAddressGetMapper.toDto(customerAddressInstance))
    }
    
    public async createCustomerAddress(customerAddressData: CustomerAddressCreateInputDto): Promise<CustomerAddressCreateOutputDto> {
        // Check if customer is authenticated
        if (!this.customer) {
            throw new PermissionDeniedError()
        }

        // Create customer address
        const customerAddressInput = this.customerAddressCreateMapper.toDbModel(customerAddressData, { 
            customerId: this.customer.id 
        })

        const customerAddressInstance = await this.customerAddressRepository.create(customerAddressInput)
        return this.customerAddressCreateMapper.toDto(customerAddressInstance)
    }

    public async deleteCustomerAddress(customerAddressId: bigint): Promise<void> {
        // Check if customer is authenticated
        if (!this.customer) {
            throw new PermissionDeniedError()
        }

        const customerAddress = await this.customerAddressRepository.getOne(customerAddressId)

        // Check if customer address exists
        if (!customerAddress) {
            throw new CustomerAddressNotFoundWithIdError(customerAddressId)
        }

        // Check if customer has ownership on address
        if (this.customer.id !== customerAddress?.customerId) {
            throw new CustomerAddressOwnershipError(this.customer.id, customerAddressId)
        }

        // Delete customer address
        await this.customerAddressRepository.delete(customerAddressId)
    }

    public async getCustomerAddresses(customerId: bigint): Promise<CustomerAddressGetOutputDto[]> {
        // Check if moderator is authenticated
        if (!this.moderator) {
            throw new PermissionDeniedError()
        }

        // Check if customer exists
        const customerExists = await this.customerRepository.exists(customerId)

        if (!customerExists) {
            throw new CustomerNotFoundWithIdError(customerId)
        }

        // Get customer addresses
        const customerAddressesInstances = await this.customerAddressRepository.getCustomerAddresses(customerId)
        return customerAddressesInstances.map(customerAddressInstance => this.customerAddressGetMapper.toDto(customerAddressInstance))
    }

    public async getCustomersAddresses(status?: CustomerAddressApprovalStatus): Promise<CustomerAddressGetOutputDto[]> {
        // Check if moderator is authenticated
        if (!this.moderator) {
            throw new PermissionDeniedError()
        }

        // Get customer addresses
        const customerAddressesInstances = await this.customerAddressRepository.getCustomersAdresses(status)
        return customerAddressesInstances.map(customerAddressInstance => this.customerAddressGetMapper.toDto(customerAddressInstance))
    }

    public async approveCustomerAddress(customerAddressId: bigint): Promise<void> {
        // Check if moderator is authenticated
        if (!this.moderator) {
            throw new PermissionDeniedError()
        }

        // Check if customer address exists
        const customerAddressExists = await this.customerAddressRepository.exists(customerAddressId)

        if (!customerAddressExists) {
            throw new CustomerAddressNotFoundWithIdError(customerAddressId)
        }

        // Approve customer address
        await this.customerAddressRepository.update(customerAddressId, {
            approvalStatus: "APPROVED"
        })
    }

    public async rejectCustomerAddress(customerAddressId: bigint): Promise<void> {
        // Check if moderator is authenticated
        if (!this.moderator) {
            throw new PermissionDeniedError()
        }

        // Check if customer address exists
        const customerAddressExists = await this.customerAddressRepository.exists(customerAddressId)

        if (!customerAddressExists) {
            throw new CustomerAddressNotFoundWithIdError(customerAddressId)
        }

        // Reject customer address
        await this.customerAddressRepository.update(customerAddressId, {
            approvalStatus: "REJECTED"
        })
    }

}