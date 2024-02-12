import BaseService from "@src/core/services/BaseService";
import { RestaurantCreateInputDto, RestaurantCreateOutputDto } from "../../dto/restaurant.dto";
import { IRestaurantCreateMapper } from "../../mappers/interfaces/restaurant.mappers";
import IRestaurantRepository from "../../repositories/interfaces/IRestaurantRepository";
import IRestaurantService from "../interfaces/IRestaurantService";

export default class RestaurantService extends BaseService implements IRestaurantService {

    constructor(
        protected restaurantCreateMapper: IRestaurantCreateMapper,
        protected restaurantRepository: IRestaurantRepository
    ) {
        super()
    }

    public async create(restaurantData: RestaurantCreateInputDto): Promise<RestaurantCreateOutputDto> {
        const restaurantCreateInput = this.restaurantCreateMapper.toDbModel(restaurantData)
        const restaurantCreatedInstance = await this.restaurantRepository.create(restaurantCreateInput)
        return this.restaurantCreateMapper.toDto(restaurantCreatedInstance)
    }

}