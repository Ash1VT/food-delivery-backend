import { PromocodeModel, PromocodeCreateInput, PromocodeUpdateInput } from "../../models/promocode";
import IBaseRepository from "../../../../base/repositories/interfaces/IBaseRepository";

export default interface IPromocodeRepository   
                         extends IBaseRepository<PromocodeModel, PromocodeCreateInput, PromocodeUpdateInput> {

}