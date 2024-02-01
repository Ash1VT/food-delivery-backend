import { PromotionGetOutputDTO, PromotionCreateInputDTO, PromotionCreateOutputDTO } from "../../dto/promotion";

export default interface IPromotionService {
    // getOne(promotionId: number): Promise<PromotionGetOutputDTO>
    create(promotionData: PromotionCreateInputDTO): Promise<PromotionCreateOutputDTO>
}