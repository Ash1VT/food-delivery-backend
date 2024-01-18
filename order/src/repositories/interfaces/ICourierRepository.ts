import { CourierCreateInput, CourierModel, CourierUpdateInput } from "../../models/courier";
import IBaseRepository from "./IBaseRepository";

export default interface ICourierRepository
                         extends IBaseRepository<CourierModel, CourierCreateInput, CourierUpdateInput> {
    getOneWithOrders(id: number): Promise<CourierModel | null>
    getManyWithOrders(): Promise<CourierModel[]>
}