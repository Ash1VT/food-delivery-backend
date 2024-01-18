import { PromocodeModel, PromocodeCreateInput, PromocodeUpdateInput } from "../../models/promocode";
import IBaseRepository from "./IBaseRepository";

export default interface IPromocodeRepository   
                         extends IBaseRepository<PromocodeModel, PromocodeCreateInput, PromocodeUpdateInput> {

}