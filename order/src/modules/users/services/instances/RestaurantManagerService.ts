import { RestaurantManagerGetOutputDTO, RestaurantManagerCreateInputDTO, RestaurantManagerCreateOutputDTO } from "../../dto/restaurantManager";
import { RestaurantManagerNotFoundWithIdError } from "../../errors/restaurantManager";
import { IRestaurantManagerGetMapper, IRestaurantManagerCreateMapper } from "../../mappers/interfaces/restaurantManager";
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
    
    public async create(restaurantManagerData: RestaurantManagerCreateInputDTO): Promise<RestaurantManagerCreateOutputDTO> {
        const restaurantManagerCreateInput = this.restaurantManagerCreateMapper.toDbModel(restaurantManagerData)
        const restaurantManagerCreatedInstance = await this.restaurantManagerRepository.create(restaurantManagerCreateInput)
        return this.restaurantManagerCreateMapper.toDto(restaurantManagerCreatedInstance)
    }

}