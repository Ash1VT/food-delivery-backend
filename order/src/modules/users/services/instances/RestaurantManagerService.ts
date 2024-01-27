import { RestaurantManagerGetOutputDTO, RestaurantManagerCreateInputDTO, RestaurantManagerCreateOutputDTO } from "../../dto/restaurantManager";
import { RestaurantManagerNotFoundWithIdError } from "../../errors/restaurantManager";
import { IRestaurantManagerGetMapper, IRestaurantManagerCreateMapper } from "../../mappers/interfaces/restaurantManager";
import IRestaurantManagerRepository from "../../repositories/interfaces/IRestaurantManagerRepository";
import IRestaurantManagerService from "../interfaces/IRestaurantManagerService";

export default class RestaurantManagerService implements IRestaurantManagerService {
    constructor(
        protected restaurantManagerGetMapper: IRestaurantManagerGetMapper,
        protected restaurantManagerCreateMapper: IRestaurantManagerCreateMapper,
        protected restaurantManagerRepository: IRestaurantManagerRepository
    ) {}

    public async getOne(id: number): Promise<RestaurantManagerGetOutputDTO> {
        const restaurantManagerInstance = await this.restaurantManagerRepository.getOne(id)

        if (!restaurantManagerInstance) {
            throw new RestaurantManagerNotFoundWithIdError(id)
        }

        return this.restaurantManagerGetMapper.toDto(restaurantManagerInstance, {})
    }
    
    public async getMany(): Promise<RestaurantManagerGetOutputDTO[]> {
        const restaurantManagerInstances = await this.restaurantManagerRepository.getMany()
        return this.restaurantManagerGetMapper.toDtos(restaurantManagerInstances, [])
    }
    
    public async create(data: RestaurantManagerCreateInputDTO): Promise<RestaurantManagerCreateOutputDTO> {
        const restaurantManagerCreateInput = await this.restaurantManagerCreateMapper.toDbModel(data, {})
        const restaurantManagerCreatedInstance = await this.restaurantManagerRepository.create(restaurantManagerCreateInput)
        return this.restaurantManagerCreateMapper.toDto(restaurantManagerCreatedInstance, {})
    }

}