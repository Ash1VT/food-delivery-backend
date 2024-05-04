import BaseService from '@src/core/services/BaseService';
import { CustomerCreateInputDto, CustomerCreateOutputDto } from "../../dto/customer.dto";
import { ICustomerCreateMapper } from "../../mappers/interfaces/customer.mappers";
import ICustomerRepository from "../../repositories/interfaces/ICustomerRepository";
import ICustomerService from "../interfaces/ICustomerService";

export default class CustomerService extends BaseService implements ICustomerService {

    constructor(
        protected customerCreateMapper: ICustomerCreateMapper,
        protected customerRepository: ICustomerRepository
    ) {
        super()
    }
    
    public async create(customerData: CustomerCreateInputDto): Promise<CustomerCreateOutputDto> {
        const customerCreateInput = this.customerCreateMapper.toDbModel(customerData)
        const customerCreatedInstance = await this.customerRepository.create(customerCreateInput)
        return this.customerCreateMapper.toDto(customerCreatedInstance)
    }

}