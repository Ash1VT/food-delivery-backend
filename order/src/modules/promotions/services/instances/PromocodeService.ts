import { PermissionDeniedError } from './../../../users/errors/permissions';
import { RestaurantManagerModel } from './../../../users/models/restaurantManager';
import { PromocodeGetOutputDTO, PromocodeCreateInputDTO, PromocodeCreateOutputDTO, PromocodeUpdateInputDTO, PromocodeUpdateOutputDTO } from "../../dto/promocode";
import { PromocodeNotFoundWithIdError, PromocodeNotFoundWithNameError, PromocodeUsageError } from "../../errors/promocode";
import { IPromocodeGetMapper, IPromocodeCreateMapper, IPromocodeUpdateMapper } from "../../mappers/interfaces/promocode";
import { PromocodeModel } from "../../models/promocode";
import IRestaurantRepository from "@src/modules/restaurants/repositories/interfaces/IRestaurantRepository";
import IPromocodeRepository from "../../repositories/interfaces/IPromocodeRepository";
import IPromocodeService from "../interfaces/IPromocodeService";
import { RestaurantNotFoundWithIdError } from "@src/modules/restaurants/errors/restaurant";
import { mapManyModels } from "@src/utils/mapManyModels";
import { RestaurantManagerOwnershipError } from '@src/modules/users/errors/restaurantManager';

export default class PromocodeService implements IPromocodeService {

    constructor(
        protected promocodeGetMapper: IPromocodeGetMapper,
        protected promocodeCreateMapper: IPromocodeCreateMapper,
        protected promocodeUpdateMapper: IPromocodeUpdateMapper,
        protected promocodeRepository: IPromocodeRepository,
        protected restaurantRepository: IRestaurantRepository,
        protected restaurantManager?: RestaurantManagerModel
    ) {}


    // public async getOne(promocodeId: number): Promise<PromocodeGetOutputDTO> {

    //     if (!this.restaurantManager) {
    //         throw new PermissionDeniedError()
    //     }

    //     const promocodeInstance = await this.promocodeRepository.getOne(promocodeId)

    //     if (!promocodeInstance) {
    //         throw new PromocodeNotFoundWithIdError(promocodeId)
    //     }

    //     if (promocodeInstance.restaurantId !== this.restaurantManager.restaurantId) {
    //         throw new RestaurantManagerOwnershipError(this.restaurantManager.id, promocodeInstance.restaurantId)
    //     }

    //     return this.promocodeGetMapper.toDto(promocodeInstance)
    // }

    // public async getOneByName(promocodeName: string): Promise<PromocodeGetOutputDTO> {

    //     if (!this.restaurantManager) {
    //         throw new PermissionDeniedError()
    //     }

    //     const promocodeInstance = await this.promocodeRepository.getOneByName(promocodeName)

    //     if (!promocodeInstance) {
    //         throw new PromocodeNotFoundWithNameError(promocodeName)
    //     }

    //     if (promocodeInstance.restaurantId !== this.restaurantManager.restaurantId) {
    //         throw new RestaurantManagerOwnershipError(this.restaurantManager.id, promocodeInstance.restaurantId)
    //     }

    //     return this.promocodeGetMapper.toDto(promocodeInstance)
    // }

    // public async getMany(): Promise<PromocodeGetOutputDTO[]> {
    //     const promocodeInstances = await this.promocodeRepository.getMany()
    //     return mapManyModels(promocodeInstances, this.promocodeGetMapper.toDto)
    // }

    public async getRestaurantPromocodes(restaurantId: number): Promise<PromocodeGetOutputDTO[]> {

        if (!this.restaurantManager) {
            throw new PermissionDeniedError()
        }
        
        if (Number(this.restaurantManager.restaurantId) !== restaurantId) {
            throw new RestaurantManagerOwnershipError(this.restaurantManager.id, restaurantId)
        }

        const promocodeInstances = await this.promocodeRepository.getRestaurantPromocodes(restaurantId)
        return mapManyModels(promocodeInstances, this.promocodeGetMapper.toDto)
    }

    public async create(promocodeData: PromocodeCreateInputDTO): Promise<PromocodeCreateOutputDTO> {
        
        if (!this.restaurantManager) {
            throw new PermissionDeniedError()
        }

        const promocodeCreateInput = this.promocodeCreateMapper.toDbModel(promocodeData)

        const restaurantInstance = await this.restaurantRepository.getOne(promocodeData.restaurantId)

        if (!restaurantInstance) {
            throw new RestaurantNotFoundWithIdError(promocodeData.restaurantId)
        }

        if (this.restaurantManager.restaurantId !== promocodeCreateInput.restaurantId) {
            throw new RestaurantManagerOwnershipError(this.restaurantManager.id, promocodeCreateInput.restaurantId)
        }

        const promocodeCreatedInstance = await this.promocodeRepository.create(promocodeCreateInput)
        return this.promocodeCreateMapper.toDto(promocodeCreatedInstance)
    }

    public async update(promocodeId: number, promocodeData: PromocodeUpdateInputDTO): Promise<PromocodeUpdateOutputDTO> {

        if (!this.restaurantManager) {
            throw new PermissionDeniedError()
        }

        const promocodeInstance = await this.promocodeRepository.getOne(promocodeId)

        if (!promocodeInstance) {
            throw new PromocodeNotFoundWithIdError(promocodeId)
        }

        if (this.restaurantManager.restaurantId !== promocodeInstance.restaurantId) {
            throw new RestaurantManagerOwnershipError(this.restaurantManager.id, promocodeInstance.restaurantId)
        }

        const promocodeUpdateInput = this.promocodeUpdateMapper.toDbModel(promocodeData)

        if (promocodeUpdateInput.maxUsageCount && promocodeUpdateInput.maxUsageCount > promocodeInstance.currentUsageCount) {
            throw new PromocodeUsageError(promocodeId)
        }

        const promocodeUpdatedInstance = await this.promocodeRepository.update(promocodeId, promocodeUpdateInput) as PromocodeModel
        return this.promocodeUpdateMapper.toDto(promocodeUpdatedInstance)
    }

    public async deactivate(promocodeId: number): Promise<void> {

        if (!this.restaurantManager) {
            throw new PermissionDeniedError()
        }

        const promocodeInstance = await this.promocodeRepository.getOne(promocodeId)

        if (!promocodeInstance) {
            throw new PromocodeNotFoundWithIdError(promocodeId)
        }

        if (this.restaurantManager.restaurantId !== promocodeInstance.restaurantId) {
            throw new RestaurantManagerOwnershipError(this.restaurantManager.id, promocodeInstance.restaurantId)
        }

        await this.promocodeRepository.update(promocodeId, {
            isActive: false
        })
    }

    public async activate(promocodeId: number): Promise<void> {

        if (!this.restaurantManager) {
            throw new PermissionDeniedError()
        }

        const promocodeInstance = await this.promocodeRepository.getOne(promocodeId)

        if (!promocodeInstance) {
            throw new PromocodeNotFoundWithIdError(promocodeId)
        }

        if (this.restaurantManager.restaurantId !== promocodeInstance.restaurantId) {
            throw new RestaurantManagerOwnershipError(this.restaurantManager.id, promocodeInstance.restaurantId)
        }

        await this.promocodeRepository.update(promocodeId, {
            isActive: true
        })
    }

}