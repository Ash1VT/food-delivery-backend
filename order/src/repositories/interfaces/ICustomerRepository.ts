import { CustomerCreateInput, CustomerModel, CustomerUpdateInput } from "../../models/customer";
import IBaseRepository from "./IBaseRepository";

export default interface ICustomerRepository
                         extends IBaseRepository<CustomerModel, CustomerCreateInput, CustomerUpdateInput> {
    getOneWithOrders(id: number): Promise<CustomerModel | null>
    getManyWithOrders(): Promise<CustomerModel[]>
}