import { PromotionGetOutputDto, PromotionCreateInputDto, PromotionCreateOutputDto } from "../../dto/promotion.dto";

export default interface IPromotionService {
    create(promotionData: PromotionCreateInputDto): Promise<PromotionCreateOutputDto>
}