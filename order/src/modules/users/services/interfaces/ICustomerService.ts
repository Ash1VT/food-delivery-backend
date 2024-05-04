import IBaseService from "@src/core/services/IBaseService";
import { CustomerGetOutputDto, CustomerCreateInputDto, CustomerCreateOutputDto } from "../../dto/customer.dto";

export default interface ICustomerService extends IBaseService {
    create(customerData: CustomerCreateInputDto): Promise<CustomerCreateOutputDto>
}