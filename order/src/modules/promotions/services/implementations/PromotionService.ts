import { PromotionGetOutputDto, PromotionCreateInputDto, PromotionCreateOutputDto } from "../../dto/promotion.dto";
import { PromotionNotFoundWithIdError } from "../../errors/promotion.errors";
import { IPromotionGetMapper, IPromotionCreateMapper } from "../../mappers/interfaces/promotion.mappers";
import IPromotionRepository from "../../repositories/interfaces/IPromotionRepository";
import IPromotionService from "../interfaces/IPromotionService";
import { PromocodeGetOutputDto } from "../../dto/promocode.dto";

export default class PromotionService implements IPromotionService {

    constructor(
        protected promotionCreateMapper: IPromotionCreateMapper,
        protected promotionRepository: IPromotionRepository
    ) {}

    // public async getOne(id: number): Promise<PromotionGetOutputDTO> {
    //     const promotionInstance = await this.promotionRepository.getOne(id)

    //     if (!promotionInstance) {
    //         throw new PromotionNotFoundWithIdError(id)
    //     }

    //     return this.promotionGetMapper.toDto(promotionInstance)
    // }

    // public async getMany(): Promise<PromotionGetOutputDTO[]> {
    //     const promotionInstances = await this.promotionRepository.getMany()
    //     return mapManyModels(promotionInstances, this.promotionGetMapper.toDto)
    // }

    public async create(promotionData: PromotionCreateInputDto): Promise<PromotionCreateOutputDto> {
        const promotionCreateInput = this.promotionCreateMapper.toDbModel(promotionData)
        const promotionCreatedInstance = await this.promotionRepository.create(promotionCreateInput)
        return this.promotionCreateMapper.toDto(promotionCreatedInstance)
    }

}