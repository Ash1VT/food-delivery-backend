import { CustomerGetOutputDTO, CustomerCreateInputDTO, CustomerCreateOutputDTO } from "../../dto/customer";
import { CustomerNotFoundWithIdError } from "../../errors/customer";
import { ICustomerGetMapper, ICustomerCreateMapper } from "../../mappers/interfaces/customer";
import ICustomerRepository from "../../repositories/interfaces/ICustomerRepository";
import ICustomerService from "../interfaces/ICustomerService";

export default class CustomerService implements ICustomerService {

    constructor(
        protected customerGetMapper: ICustomerGetMapper,
        protected customerCreateMapper: ICustomerCreateMapper,
        protected customerRepository: ICustomerRepository
    ) {}
    
    public async getOne(id: number): Promise<CustomerGetOutputDTO> {
        const customerInstance = await this.customerRepository.getOne(id)

        if (!customerInstance) {
            throw new CustomerNotFoundWithIdError(id)
        }

        return this.customerGetMapper.toDto(customerInstance, {})
    }

    public async getMany(): Promise<CustomerGetOutputDTO[]> {
        const customerInstances = await this.customerRepository.getMany()
        return this.customerGetMapper.toDtos(customerInstances, [])
    }

    public async create(data: CustomerCreateInputDTO): Promise<CustomerCreateOutputDTO> {
        const customerCreateInput = await this.customerCreateMapper.toDbModel(data, {})
        const customerCreatedInstance = await this.customerRepository.create(customerCreateInput)
        return this.customerCreateMapper.toDto(customerCreatedInstance, {})
    }

}