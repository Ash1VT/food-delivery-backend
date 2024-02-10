import { RestaurantCreateInputDto, RestaurantCreateOutputDto } from "../../dto/restaurant.dto";
import { IRestaurantCreateMapper } from "../../mappers/interfaces/restaurant.mappers";
import IRestaurantRepository from "../../repositories/interfaces/IRestaurantRepository";
import IRestaurantService from "../interfaces/IRestaurantService";

export default class RestaurantService implements IRestaurantService {

    constructor(
        protected restaurantCreateMapper: IRestaurantCreateMapper,
        protected restaurantRepository: IRestaurantRepository
    ) {}

    // public async getOne(id: number): Promise<RestaurantGetOutputDTO> {
    //     const restaurantInstance = await this.restaurantRepository.getOne(id)

    //     if (!restaurantInstance) {
    //         throw new RestaurantNotFoundWithIdError(id)
    //     }

    //     return this.restaurantGetMapper.toDto(restaurantInstance)
    // }
    
    // public async getMany(): Promise<RestaurantGetOutputDTO[]> {
    //     const restaurantInstances = await this.restaurantRepository.getMany()
    //     return mapManyModels(restaurantInstances, this.restaurantGetMapper.toDto)
    // }
    
    public async create(restaurantData: RestaurantCreateInputDto): Promise<RestaurantCreateOutputDto> {
        const restaurantCreateInput = this.restaurantCreateMapper.toDbModel(restaurantData)
        const restaurantCreatedInstance = await this.restaurantRepository.create(restaurantCreateInput)
        return this.restaurantCreateMapper.toDto(restaurantCreatedInstance)
    }

}