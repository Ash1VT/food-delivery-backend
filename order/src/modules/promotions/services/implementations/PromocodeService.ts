import { PermissionDeniedError } from '../../../users/errors/permissions.errors';
import { PromocodeAlreadyExistsWithNameError } from "../../errors/promocode.errors";
import { RestaurantManagerModel } from '../../../users/models/restaurantManager.models';
import { PromocodeGetOutputDto, PromocodeCreateInputDto, PromocodeCreateOutputDto, PromocodeUpdateInputDto, PromocodeUpdateOutputDto } from "../../dto/promocode.dto";
import { PromocodeMaximumUsageError, PromocodeNotFoundWithIdError, PromocodeNotFoundWithNameError, PromocodeAmountUsageError } from "../../errors/promocode.errors";
import { IPromocodeGetMapper, IPromocodeCreateMapper, IPromocodeUpdateMapper } from "../../mappers/interfaces/promocode.mappers";
import { PromocodeModel } from "../../models/promocode.models";
import IRestaurantRepository from "@src/modules/restaurants/repositories/interfaces/IRestaurantRepository";
import IPromocodeRepository from "../../repositories/interfaces/IPromocodeRepository";
import IPromocodeService from "../interfaces/IPromocodeService";
import { RestaurantNotFoundWithIdError } from "@src/modules/restaurants/errors/restaurant.errors";
import { RestaurantManagerOwnershipError } from '@src/modules/users/errors/restaurantManager.errors';

export default class PromocodeService implements IPromocodeService {

    constructor(
        protected promocodeGetMapper: IPromocodeGetMapper,
        protected promocodeCreateMapper: IPromocodeCreateMapper,
        protected promocodeUpdateMapper: IPromocodeUpdateMapper,
        protected promocodeRepository: IPromocodeRepository,
        protected restaurantRepository: IRestaurantRepository,
        protected restaurantManager?: RestaurantManagerModel
    ) {}

    public async getRestaurantPromocodes(restaurantId: bigint): Promise<PromocodeGetOutputDto[]> {

        if (!this.restaurantManager) {
            throw new PermissionDeniedError()
        }
        
        if (this.restaurantManager.restaurantId !== restaurantId) {
            throw new RestaurantManagerOwnershipError(this.restaurantManager.id, restaurantId)
        }

        const promocodeInstances = await this.promocodeRepository.getRestaurantPromocodes(restaurantId)
        return promocodeInstances.map((promocodeInstance) => this.promocodeGetMapper.toDto(promocodeInstance))
    }

    // Add check for existence of promocode with such name
    public async create(promocodeData: PromocodeCreateInputDto): Promise<PromocodeCreateOutputDto> {

        if (!this.restaurantManager) {
            throw new PermissionDeniedError()
        }

        const promocodeInstance = await this.promocodeRepository.getOneByName(promocodeData.nameIdentifier)

        if (promocodeInstance) {
            throw new PromocodeAlreadyExistsWithNameError(promocodeData.nameIdentifier)
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

    public async update(promocodeId: bigint, promocodeData: PromocodeUpdateInputDto): Promise<PromocodeUpdateOutputDto> {

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

        if (promocodeUpdateInput.maxUsageCount && promocodeInstance.currentUsageCount > promocodeUpdateInput.maxUsageCount) {
            throw new PromocodeMaximumUsageError(promocodeId)
        }

        const promocodeUpdatedInstance = await this.promocodeRepository.update(promocodeId, promocodeUpdateInput) as PromocodeModel
        return this.promocodeUpdateMapper.toDto(promocodeUpdatedInstance)
    }

    public async deactivate(promocodeId: bigint): Promise<void> {

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

    public async activate(promocodeId: bigint): Promise<void> {

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