import { CourierCreateInput, CourierModel, CourierUpdateInput } from "../../models/courier";
import IBaseRepository from "../../../../base/repositories/interfaces/IBaseRepository";

export default interface ICourierRepository
                         extends IBaseRepository<CourierModel, CourierCreateInput, CourierUpdateInput> {

}