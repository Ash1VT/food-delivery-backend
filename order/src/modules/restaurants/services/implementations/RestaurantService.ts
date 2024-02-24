import BaseService from "@src/core/services/BaseService";
import { RestaurantCreateInputDto, RestaurantCreateOutputDto, RestaurantUpdateInputDto, RestaurantUpdateOutputDto } from "../../dto/restaurant.dto";
import { IRestaurantCreateMapper, IRestaurantUpdateMapper } from "../../mappers/interfaces/restaurant.mappers";
import IRestaurantRepository from "../../repositories/interfaces/IRestaurantRepository";
import IRestaurantService from "../interfaces/IRestaurantService";
import { RestaurantNotFoundWithIdError } from "../../errors/restaurant.errors";
import { RestaurantModel } from "../../models/restaurant.models";
import IRestaurantManagerRepository from "@src/modules/users/repositories/interfaces/IRestaurantManagerRepository";
import { RestaurantManagerNotFoundWithIdError } from "@src/modules/users/errors/restaurantManager.errors";

export default class RestaurantService extends BaseService implements IRestaurantService {

    constructor(
        protected restaurantCreateMapper: IRestaurantCreateMapper,
        protected restaurantUpdateMapper: IRestaurantUpdateMapper,
        protected restaurantRepository: IRestaurantRepository,
        protected restaurantManagerRepository: IRestaurantManagerRepository
    ) {
        super()
    }

    public async create(restaurantData: RestaurantCreateInputDto): Promise<RestaurantCreateOutputDto> {
        const restaurantManagerId = restaurantData.restaurantManagerId
        const restaurantCreateInput = this.restaurantCreateMapper.toDbModel(restaurantData)
        const restaurantCreatedInstance = await this.restaurantRepository.create(restaurantCreateInput)

        const restaurantManagerUpdatedInstance = await this.restaurantManagerRepository.update(restaurantManagerId, {
            restaurantId: restaurantCreatedInstance.id
        })

        if (!restaurantManagerUpdatedInstance) {
            throw new RestaurantManagerNotFoundWithIdError(restaurantManagerId)
        }
        
        return this.restaurantCreateMapper.toDto(restaurantCreatedInstance)
    }

    public async update(restaurantId: bigint, restaurantData: RestaurantUpdateInputDto): Promise<RestaurantUpdateOutputDto> {
        const restaurantInstance = await this.restaurantRepository.getOne(restaurantId)

        if (!restaurantInstance) {
            throw new RestaurantNotFoundWithIdError(restaurantId)
        }

        const restaurantUpdateInput = this.restaurantUpdateMapper.toDbModel(restaurantData)
        const restaurantUpdatedInstance = await this.restaurantRepository.update(restaurantId, restaurantUpdateInput) as RestaurantModel
        return this.restaurantUpdateMapper.toDto(restaurantUpdatedInstance)
    }

}