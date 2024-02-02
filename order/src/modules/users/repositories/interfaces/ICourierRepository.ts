import { CourierCreateInput, CourierModel, CourierUpdateInput } from "../../models/courier";
import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";

export default interface ICourierRepository
                         extends IBaseRepository<CourierModel, CourierCreateInput, CourierUpdateInput> {

}