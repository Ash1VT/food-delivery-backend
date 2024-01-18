import { PromotionModel, PromotionCreateInput, PromotionUpdateInput } from "../../models/promotion";
import IBaseRepository from "./IBaseRepository";

export default interface IPromotionRepository
                         extends IBaseRepository<PromotionModel, PromotionCreateInput, PromotionUpdateInput> {

}