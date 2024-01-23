import { PromotionModel, PromotionCreateInput, PromotionUpdateInput } from "../../models/promotion";
import IBaseRepository from "@/base/repositories/interfaces/IBaseRepository";

export default interface IPromotionRepository
                         extends IBaseRepository<PromotionModel, PromotionCreateInput, PromotionUpdateInput> {

}