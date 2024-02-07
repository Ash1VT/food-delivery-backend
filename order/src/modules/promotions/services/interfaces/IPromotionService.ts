import { PromotionGetOutputDTO, PromotionCreateInputDTO, PromotionCreateOutputDTO } from "../../dto/promotion";

export default interface IPromotionService {
    create(promotionData: PromotionCreateInputDTO): Promise<PromotionCreateOutputDTO>
}