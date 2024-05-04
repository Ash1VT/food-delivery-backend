import IBaseService from "@src/core/services/IBaseService";
import { PromotionGetOutputDto, PromotionCreateInputDto, PromotionCreateOutputDto } from "../../dto/promotion.dto";

export default interface IPromotionService extends IBaseService {
    create(promotionData: PromotionCreateInputDto): Promise<PromotionCreateOutputDto>
}