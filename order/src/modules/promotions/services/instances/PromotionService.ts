import { mapManyModels } from "@src/utils/mapManyModels";
import { PromotionGetOutputDTO, PromotionCreateInputDTO, PromotionCreateOutputDTO } from "../../dto/promotion";
import { PromotionNotFoundWithIdError } from "../../errors/promotion";
import { IPromotionGetMapper, IPromotionCreateMapper } from "../../mappers/interfaces/promotion";
import IPromotionRepository from "../../repositories/interfaces/IPromotionRepository";
import IPromotionService from "../interfaces/IPromotionService";
import { PromocodeGetOutputDTO } from "../../dto/promocode";

export default class PromotionService implements IPromotionService {

    constructor(
        protected promotionGetMapper: IPromotionGetMapper,
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
    
    public async getRestaurantPromocodes(restaurantId: number): Promise<PromocodeGetOutputDTO[]> {

    }

    public async create(data: PromotionCreateInputDTO): Promise<PromotionCreateOutputDTO> {
        const promotionCreateInput = this.promotionCreateMapper.toDbModel(data)
        const promotionCreatedInstance = await this.promotionRepository.create(promotionCreateInput)
        return this.promotionCreateMapper.toDto(promotionCreatedInstance)
    }

}