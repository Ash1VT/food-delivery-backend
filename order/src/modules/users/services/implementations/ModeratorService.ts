import BaseService from '@src/core/services/BaseService';
import { ModeratorCreateInputDto, ModeratorCreateOutputDto } from "../../dto/moderator.dto";
import { IModeratorCreateMapper } from "../../mappers/interfaces/moderator.mappers";
import IModeratorRepository from "../../repositories/interfaces/IModeratorRepository";
import IModeratorService from "../interfaces/IModeratorService";

export default class ModeratorService extends BaseService implements IModeratorService {
    
    constructor(
        protected moderatorCreateMapper: IModeratorCreateMapper,
        protected moderatorRepository: IModeratorRepository
    ) {
        super()
    }

    public async create(moderatorData: ModeratorCreateInputDto): Promise<ModeratorCreateOutputDto> {
        const moderatorCreateInput = this.moderatorCreateMapper.toDbModel(moderatorData)
        const moderatorCreatedInstance = await this.moderatorRepository.create(moderatorCreateInput)
        return this.moderatorCreateMapper.toDto(moderatorCreatedInstance)
    }

}