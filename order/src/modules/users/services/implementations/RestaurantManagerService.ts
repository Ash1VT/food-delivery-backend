import { RestaurantManagerGetOutputDto, RestaurantManagerCreateInputDto, RestaurantManagerCreateOutputDto } from "../../dto/restaurantManager.dto";
import { RestaurantManagerNotFoundWithIdError } from "../../errors/restaurantManager.errors";
import { IRestaurantManagerGetMapper, IRestaurantManagerCreateMapper } from "../../mappers/interfaces/restaurantManager.mappers";
import IRestaurantManagerRepository from "../../repositories/interfaces/IRestaurantManagerRepository";
import IRestaurantManagerService from "../interfaces/IRestaurantManagerService";

export default class RestaurantManagerService implements IRestaurantManagerService {
    constructor(
        protected restaurantManagerCreateMapper: IRestaurantManagerCreateMapper,
        protected restaurantManagerRepository: IRestaurantManagerRepository
    ) {}

    // public async getOne(id: number): Promise<RestaurantManagerGetOutputDTO> {
    //     const restaurantManagerInstance = await this.restaurantManagerRepository.getOne(id)

    //     if (!restaurantManagerInstance) {
    //         throw new RestaurantManagerNotFoundWithIdError(id)
    //     }

    //     return this.restaurantManagerGetMapper.toDto(restaurantManagerInstance)
    // }
    
    // public async getMany(): Promise<RestaurantManagerGetOutputDTO[]> {
    //     const restaurantManagerInstances = await this.restaurantManagerRepository.getMany()
    //     return mapManyModels(restaurantManagerInstances, this.restaurantManagerGetMapper.toDto)
    // }
    
    public async create(restaurantManagerData: RestaurantManagerCreateInputDto): Promise<RestaurantManagerCreateOutputDto> {
        const restaurantManagerCreateInput = this.restaurantManagerCreateMapper.toDbModel(restaurantManagerData)
        const restaurantManagerCreatedInstance = await this.restaurantManagerRepository.create(restaurantManagerCreateInput)
        return this.restaurantManagerCreateMapper.toDto(restaurantManagerCreatedInstance)
    }

}