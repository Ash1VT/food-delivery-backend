import { CustomerGetOutputDTO, CustomerCreateInputDTO, CustomerCreateOutputDTO } from "../../dto/customer";

export default interface ICustomerService {
    create(customerData: CustomerCreateInputDTO): Promise<CustomerCreateOutputDTO>
}