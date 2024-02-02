import { PromotionModel, PromotionCreateInput, PromotionUpdateInput } from "../../models/promotion";
import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";

export default interface IPromotionRepository extends IBaseRepository<PromotionModel, PromotionCreateInput, PromotionUpdateInput> {}