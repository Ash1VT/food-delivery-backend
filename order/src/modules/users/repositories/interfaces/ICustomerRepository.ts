import { CustomerCreateInput, CustomerModel, CustomerUpdateInput } from "../../models/customer";
import IBaseRepository from "@/base/repositories/interfaces/IBaseRepository";

export default interface ICustomerRepository
                         extends IBaseRepository<CustomerModel, CustomerCreateInput, CustomerUpdateInput> {
                            
}