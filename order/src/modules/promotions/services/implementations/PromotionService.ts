import BaseService from '@src/core/services/BaseService';
import { PromotionCreateInputDto, PromotionCreateOutputDto } from "../../dto/promotion.dto";
import { IPromotionCreateMapper } from "../../mappers/interfaces/promotion.mappers";
import IPromotionRepository from "../../repositories/interfaces/IPromotionRepository";
import IPromotionService from "../interfaces/IPromotionService";

export default class PromotionService extends BaseService implements IPromotionService {

    constructor(
        protected promotionCreateMapper: IPromotionCreateMapper,
        protected promotionRepository: IPromotionRepository
    ) {
        super()
    }

    public async create(promotionData: PromotionCreateInputDto): Promise<PromotionCreateOutputDto> {
        const promotionCreateInput = this.promotionCreateMapper.toDbModel(promotionData)
        const promotionCreatedInstance = await this.promotionRepository.create(promotionCreateInput)
        return this.promotionCreateMapper.toDto(promotionCreatedInstance)
    }

}