import { PromocodeGetOutputDTO, PromocodeCreateInputDTO, PromocodeCreateOutputDTO, PromocodeUpdateInputDTO, PromocodeUpdateOutputDTO } from "../../dto/promocode";
import { PromocodeNotFoundWithIdError, PromocodeNotFoundWithNameError } from "../../errors/promocode";
import { IPromocodeGetMapper, IPromocodeCreateMapper, IPromocodeUpdateMapper } from "../../mappers/interfaces/promocode";
import { PromocodeModel } from "../../models/promocode";
import IRestaurantRepository from "@src/modules/restaurants/repositories/interfaces/IRestaurantRepository";
import IPromocodeRepository from "../../repositories/interfaces/IPromocodeRepository";
import IPromocodeService from "../interfaces/IPromocodeService";
import { RestaurantNotFoundWithIdError } from "@src/modules/restaurants/errors/restaurant";

export default class PromocodeService implements IPromocodeService {

    constructor(
        protected promocodeGetMapper: IPromocodeGetMapper,
        protected promocodeCreateMapper: IPromocodeCreateMapper,
        protected promocodeUpdateMapper: IPromocodeUpdateMapper,
        protected promocodeRepository: IPromocodeRepository,
        protected restaurantRepository: IRestaurantRepository
    ) {}


    public async getOne(id: number): Promise<PromocodeGetOutputDTO> {
        const promocodeInstance = await this.promocodeRepository.getOne(id)

        if (!promocodeInstance) {
            throw new PromocodeNotFoundWithIdError(id)
        }

        return this.promocodeGetMapper.toDto(promocodeInstance, {})
    }

    public async getOneByName(name: string): Promise<PromocodeGetOutputDTO> {
        const promocodeInstance = await this.promocodeRepository.getOneByName(name)

        if (!promocodeInstance) {
            throw new PromocodeNotFoundWithNameError(name)
        }

        return this.promocodeGetMapper.toDto(promocodeInstance, {})
    }

    public async getMany(): Promise<PromocodeGetOutputDTO[]> {
        const promocodeInstances = await this.promocodeRepository.getMany()
        return this.promocodeGetMapper.toDtos(promocodeInstances, [])
    }
    
    public async create(data: PromocodeCreateInputDTO): Promise<PromocodeCreateOutputDTO> {
        const promocodeCreateInput = await this.promocodeCreateMapper.toDbModel(data, {})

        const restaurantInstance = await this.restaurantRepository.getOne(data.restaurantId)

        if (!restaurantInstance) {
            throw new RestaurantNotFoundWithIdError(data.restaurantId)
        }

        const promocodeCreatedInstance = await this.promocodeRepository.create(promocodeCreateInput)
        return this.promocodeCreateMapper.toDto(promocodeCreatedInstance, {})
    }

    public async update(id: number, data: PromocodeUpdateInputDTO): Promise<PromocodeUpdateOutputDTO> {
        const promocodeInstance = await this.promocodeRepository.getOne(id)

        if (!promocodeInstance) {
            throw new PromocodeNotFoundWithIdError(id)
        }

        const promocodeUpdateInput = await this.promocodeUpdateMapper.toDbModel(data, {})
        
        // if (promocodeUpdateInput.validFrom && promocodeUpdateInput.validFrom >= promocodeInstance.validUntil) {

        // }

        // if (promocodeUpdateInput.validUntil && promocodeInstance.validFrom >= promocodeUpdateInput.validUntil) {

        // }

        if (promocodeUpdateInput.maxUsageCount && promocodeUpdateInput.maxUsageCount > promocodeInstance.currentUsageCount) {

        }

        const promocodeUpdatedInstance = await this.promocodeRepository.update(id, promocodeUpdateInput) as PromocodeModel
        return this.promocodeUpdateMapper.toDto(promocodeUpdatedInstance, {})
    }

    public async deactivate(id: number): Promise<undefined> {
        const promocodeInstance = await this.promocodeRepository.getOne(id)

        if (!promocodeInstance) {
            throw new PromocodeNotFoundWithIdError(id)
        }

        await this.promocodeRepository.update(id, {
            isActive: false
        })
    }

    public async activate(id: number): Promise<undefined> {
        const promocodeInstance = await this.promocodeRepository.getOne(id)

        if (!promocodeInstance) {
            throw new PromocodeNotFoundWithIdError(id)
        }

        await this.promocodeRepository.update(id, {
            isActive: true
        })
    }

}