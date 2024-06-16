import BaseService from "@src/core/services/BaseService";
import ICustomerAddressService from "../interfaces/ICustomerAddressService";
import { ICustomerAddressGetMapper, ICustomerAddressCreateMapper, ICustomerAddressUpdateMapper } from "../../mappers/interfaces/customerAddress.mappers";
import ICustomerAddressRepository from "../../repositories/interfaces/ICustomerAddressRepository";
import { CustomerAddressCreateInputDto, CustomerAddressCreateOutputDto, CustomerAddressGetOutputDto, CustomerAddressUpdateOutputDto } from "../../dto/customerAddresses.dto";
import { PermissionDeniedError } from "@src/modules/users/errors/permissions.errors";
import ICustomerRepository from "@src/modules/users/repositories/interfaces/ICustomerRepository";
import { CustomerAddressOwnershipError, CustomerNotFoundWithIdError } from "@src/modules/users/errors/customer.errors";
import { CustomerAddressNotFoundWithIdError } from "../../errors/customerAddress.errors";
import { CustomerAddressApprovalStatus } from "../../models/customerAddressApprovalStatus.models";
import getLogger from "@src/core/setup/logger";
import { CustomerAddressModel } from "../../models/customerAddress.models";


const logger = getLogger(module)

export default class CustomerAddressService extends BaseService implements ICustomerAddressService {

    constructor(
        protected customerAddressGetMapper: ICustomerAddressGetMapper,
        protected customerAddressCreateMapper: ICustomerAddressCreateMapper,
        protected customerAddressUpdateMapper: ICustomerAddressUpdateMapper,
        protected customerAddressRepository: ICustomerAddressRepository,
        protected customerRepository: ICustomerRepository
    ) {
        super()
    }

    public async getCurrentCustomerAddresses(): Promise<CustomerAddressGetOutputDto[]> {
        // Check if customer is authenticated
        if (!this.customer) {
            logger.warn("User is not authenticated as Customer")
            throw new PermissionDeniedError()
        }

        // Get customer addresses
        const customerAddressesInstances = await this.customerAddressRepository.getCustomerAddresses(this.customer.id)
        const customerAddresssesDtos = customerAddressesInstances.map(customerAddressInstance => this.customerAddressGetMapper.toDto(customerAddressInstance))

        logger.info("Retrieved list of CustomerAddresses for the current authenticated Customer")

        return customerAddresssesDtos
    }
    
    public async createCustomerAddress(customerAddressData: CustomerAddressCreateInputDto): Promise<CustomerAddressCreateOutputDto> {
        // Check if customer is authenticated
        if (!this.customer) {
            logger.warn("User is not authenticated as Customer")
            throw new PermissionDeniedError()
        }

        // Create customer address
        const customerAddressInput = this.customerAddressCreateMapper.toDbModel(customerAddressData, { 
            customerId: this.customer.id 
        })

        const customerAddressInstance = await this.customerAddressRepository.create(customerAddressInput)
        const customerAddressDto = this.customerAddressCreateMapper.toDto(customerAddressInstance)

        logger.info(`Created new CustomerAddress for the Customer with id=${this.customer.id}`)

        return customerAddressDto
    }

    public async updateCustomerAddress(customerAddressId: bigint, customerAddressData: CustomerAddressCreateInputDto): Promise<CustomerAddressUpdateOutputDto> {
        // Check if moderator is authenticated
        if (!this.moderator) {
            logger.warn("User is not authenticated as Moderator")
            throw new PermissionDeniedError()
        }

        const customerAddress = await this.customerAddressRepository.getOne(customerAddressId)

        // Check if customer address exists
        if (!customerAddress) {
            logger.warn(`CustomerAddress with id=${customerAddressId} does not exist`)
            throw new CustomerAddressNotFoundWithIdError(customerAddressId)
        }

        // Update customer address
        const updatedCustomerAddress = await this.customerAddressRepository.update(customerAddressId, customerAddressData)
        const customerAddressDto = this.customerAddressUpdateMapper.toDto(updatedCustomerAddress as CustomerAddressModel)

        logger.info(`Updated CustomerAddress with id=${customerAddressId}`)

        return customerAddressDto

    }

    public async deleteCustomerAddress(customerAddressId: bigint): Promise<void> {
        // Check if customer is authenticated
        if (!this.customer) {
            logger.warn("User is not authenticated as Customer")
            throw new PermissionDeniedError()
        }

        const customerAddress = await this.customerAddressRepository.getOne(customerAddressId)

        // Check if customer address exists
        if (!customerAddress) {
            logger.warn(`CustomerAddress with id=${customerAddressId} does not exist`)
            throw new CustomerAddressNotFoundWithIdError(customerAddressId)
        }

        // Check if customer has ownership on address
        if (this.customer.id !== customerAddress?.customerId) {
            logger.warn(`Customer with id=${this.customer.id} does not have ownership on CustomerAddress with id=${customerAddressId}`)
            throw new CustomerAddressOwnershipError(this.customer.id, customerAddressId)
        }

        // Delete customer address
        await this.customerAddressRepository.delete(customerAddressId)
        logger.info(`Deleted CustomerAddress with id=${customerAddressId}`)
    }

    public async getCustomerAddresses(customerId: bigint): Promise<CustomerAddressGetOutputDto[]> {
        // Check if moderator is authenticated
        if (!this.moderator) {
            logger.warn("User is not authenticated as Moderator")
            throw new PermissionDeniedError()
        }

        // Check if customer exists
        const customerExists = await this.customerRepository.exists(customerId)

        if (!customerExists) {
            logger.warn(`Customer with id=${customerId} does not exist`)
            throw new CustomerNotFoundWithIdError(customerId)
        }

        // Get customer addresses
        const customerAddressesInstances = await this.customerAddressRepository.getCustomerAddresses(customerId)
        const customerAddressesDtos = customerAddressesInstances.map(customerAddressInstance => this.customerAddressGetMapper.toDto(customerAddressInstance))

        logger.info(`Retrieved list of CustomerAddresses for Customer with id=${customerId}`)

        return customerAddressesDtos
    }

    public async getCustomersAddresses(status?: CustomerAddressApprovalStatus): Promise<CustomerAddressGetOutputDto[]> {
        // Check if moderator is authenticated
        if (!this.moderator) {
            logger.warn("User is not authenticated as Moderator")
            throw new PermissionDeniedError()
        }

        // Get customer addresses
        const customerAddressesInstances = await this.customerAddressRepository.getCustomersAdresses(status)
        const customerAddressesDtos = customerAddressesInstances.map(customerAddressInstance => this.customerAddressGetMapper.toDto(customerAddressInstance))

        logger.info(`Retrieved list of CustomerAddresses for Customers with approvalStatus=${status}`)

        return customerAddressesDtos
    }

    public async approveCustomerAddress(customerAddressId: bigint): Promise<void> {
        // Check if moderator is authenticated
        if (!this.moderator) {
            logger.warn("User is not authenticated as Moderator")
            throw new PermissionDeniedError()
        }

        // Check if customer address exists
        const customerAddressExists = await this.customerAddressRepository.exists(customerAddressId)

        if (!customerAddressExists) {
            logger.warn(`CustomerAddress with id=${customerAddressId} does not exist`)
            throw new CustomerAddressNotFoundWithIdError(customerAddressId)
        }

        // Approve customer address
        await this.customerAddressRepository.update(customerAddressId, {
            approvalStatus: "APPROVED"
        })

        logger.info(`Changed approvalStatus to 'APPROVED' of CustomerAddress with id=${customerAddressId}`)
    }

    public async rejectCustomerAddress(customerAddressId: bigint): Promise<void> {
        // Check if moderator is authenticated
        if (!this.moderator) {
            logger.warn("User is not authenticated as Moderator")
            throw new PermissionDeniedError()
        }

        // Check if customer address exists
        const customerAddressExists = await this.customerAddressRepository.exists(customerAddressId)

        if (!customerAddressExists) {
            logger.warn(`CustomerAddress with id=${customerAddressId} does not exist`)
            throw new CustomerAddressNotFoundWithIdError(customerAddressId)
        }

        // Reject customer address
        await this.customerAddressRepository.update(customerAddressId, {
            approvalStatus: "REJECTED"
        })

        logger.info(`Changed approvalStatus to 'REJECTED' of CustomerAddress with id=${customerAddressId}`)
    }

}