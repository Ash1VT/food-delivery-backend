import { CustomerGetOutputDto, CustomerCreateInputDto, CustomerCreateOutputDto } from "../../dto/customer.dto";

export default interface ICustomerService {
    create(customerData: CustomerCreateInputDto): Promise<CustomerCreateOutputDto>
}