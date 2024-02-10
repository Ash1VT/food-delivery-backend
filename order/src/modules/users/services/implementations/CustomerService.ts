import { CustomerGetOutputDto, CustomerCreateInputDto, CustomerCreateOutputDto } from "../../dto/customer.dto";
import { CustomerNotFoundWithIdError } from "../../errors/customer.errors";
import { ICustomerGetMapper, ICustomerCreateMapper } from "../../mappers/interfaces/customer.mappers";
import ICustomerRepository from "../../repositories/interfaces/ICustomerRepository";
import ICustomerService from "../interfaces/ICustomerService";

export default class CustomerService implements ICustomerService {

    constructor(
        protected customerCreateMapper: ICustomerCreateMapper,
        protected customerRepository: ICustomerRepository
    ) {}
    
    // public async getOne(id: number): Promise<CustomerGetOutputDTO> {
    //     const customerInstance = await this.customerRepository.getOne(id)

    //     if (!customerInstance) {
    //         throw new CustomerNotFoundWithIdError(id)
    //     }

    //     return this.customerGetMapper.toDto(customerInstance)
    // }

    // public async getMany(): Promise<CustomerGetOutputDTO[]> {
    //     const customerInstances = await this.customerRepository.getMany()
    //     return mapManyModels(customerInstances, this.customerGetMapper.toDto)
    // }

    public async create(customerData: CustomerCreateInputDto): Promise<CustomerCreateOutputDto> {
        const customerCreateInput = this.customerCreateMapper.toDbModel(customerData)
        const customerCreatedInstance = await this.customerRepository.create(customerCreateInput)
        return this.customerCreateMapper.toDto(customerCreatedInstance)
    }

}