
import BaseService from "@src/core/services/BaseService";
import { RestaurantManagerCreateInputDto, RestaurantManagerCreateOutputDto } from "../../dto/restaurantManager.dto";
import { IRestaurantManagerCreateMapper } from "../../mappers/interfaces/restaurantManager.mappers";
import IRestaurantManagerRepository from "../../repositories/interfaces/IRestaurantManagerRepository";
import IRestaurantManagerService from "../interfaces/IRestaurantManagerService";

export default class RestaurantManagerService extends BaseService implements IRestaurantManagerService {
    constructor(
        protected restaurantManagerCreateMapper: IRestaurantManagerCreateMapper,
        protected restaurantManagerRepository: IRestaurantManagerRepository
    ) {
        super()
    }

    public async create(restaurantManagerData: RestaurantManagerCreateInputDto): Promise<RestaurantManagerCreateOutputDto> {
        const restaurantManagerCreateInput = this.restaurantManagerCreateMapper.toDbModel(restaurantManagerData)
        const restaurantManagerCreatedInstance = await this.restaurantManagerRepository.create(restaurantManagerCreateInput)
        return this.restaurantManagerCreateMapper.toDto(restaurantManagerCreatedInstance)
    }

}