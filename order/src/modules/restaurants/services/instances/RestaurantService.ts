import { mapManyModels } from "@src/utils/mapManyModels";
import { RestaurantGetOutputDTO, RestaurantCreateInputDTO, RestaurantCreateOutputDTO } from "../../dto/restaurant";
import { RestaurantNotFoundWithIdError } from "../../errors/restaurant";
import { IRestaurantGetMapper, IRestaurantCreateMapper } from "../../mappers/interfaces/restaurant";
import IRestaurantRepository from "../../repositories/interfaces/IRestaurantRepository";
import IRestaurantService from "../interfaces/IRestaurantService";

export default class RestaurantService implements IRestaurantService {

    constructor(
        protected restaurantGetMapper: IRestaurantGetMapper,
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
    
    public async create(data: RestaurantCreateInputDTO): Promise<RestaurantCreateOutputDTO> {
        const restaurantCreateInput = this.restaurantCreateMapper.toDbModel(data)
        const restaurantCreatedInstance = await this.restaurantRepository.create(restaurantCreateInput)
        return this.restaurantCreateMapper.toDto(restaurantCreatedInstance)
    }

}