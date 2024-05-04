
import BaseService from "@src/core/services/BaseService";
import { RestaurantManagerCreateInputDto, RestaurantManagerCreateOutputDto, RestaurantManagerUpdateInputDto, RestaurantManagerUpdateOutputDto } from "../../dto/restaurantManager.dto";
import { IRestaurantManagerCreateMapper, IRestaurantManagerUpdateMapper } from "../../mappers/interfaces/restaurantManager.mappers";
import IRestaurantManagerRepository from "../../repositories/interfaces/IRestaurantManagerRepository";
import IRestaurantManagerService from "../interfaces/IRestaurantManagerService";
import { RestaurantManagerNotFoundWithIdError } from "../../errors/restaurantManager.errors";
import { RestaurantManagerModel } from "../../models/restaurantManager.models";

export default class RestaurantManagerService extends BaseService implements IRestaurantManagerService {
    constructor(
        protected restaurantManagerCreateMapper: IRestaurantManagerCreateMapper,
        protected restaurantManagerUpdateMapper: IRestaurantManagerUpdateMapper,
        protected restaurantManagerRepository: IRestaurantManagerRepository
    ) {
        super()
    }

    public async create(restaurantManagerData: RestaurantManagerCreateInputDto): Promise<RestaurantManagerCreateOutputDto> {
        const restaurantManagerCreateInput = this.restaurantManagerCreateMapper.toDbModel(restaurantManagerData)
        const restaurantManagerCreatedInstance = await this.restaurantManagerRepository.create(restaurantManagerCreateInput)
        return this.restaurantManagerCreateMapper.toDto(restaurantManagerCreatedInstance)
    }
    
    public async update(restaurantManagerId: bigint, restaurantManagerData: RestaurantManagerUpdateInputDto): Promise<RestaurantManagerUpdateOutputDto> {
        const restaurantManagerInstance = await this.restaurantManagerRepository.getOne(restaurantManagerId)

        if (!restaurantManagerInstance) {
            throw new RestaurantManagerNotFoundWithIdError(restaurantManagerId)
        }

        const restaurantManagerUpdateInput = this.restaurantManagerUpdateMapper.toDbModel(restaurantManagerData)
        const restaurantManagerUpdatedInstance = await this.restaurantManagerRepository.update(restaurantManagerId, restaurantManagerUpdateInput) as RestaurantManagerModel
        return this.restaurantManagerUpdateMapper.toDto(restaurantManagerUpdatedInstance)
    }

}