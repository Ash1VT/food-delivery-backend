import { ModeratorGetOutputDto, ModeratorCreateInputDto, ModeratorCreateOutputDto } from "../../dto/moderator.dto";
import { ModeratorNotFoundWithIdError } from "../../errors/moderator.errors";
import { IModeratorGetMapper, IModeratorCreateMapper } from "../../mappers/interfaces/moderator.mappers";
import IModeratorRepository from "../../repositories/interfaces/IModeratorRepository";
import IModeratorService from "../interfaces/IModeratorService";

export default class ModeratorService implements IModeratorService {
    
    constructor(
        protected moderatorCreateMapper: IModeratorCreateMapper,
        protected moderatorRepository: IModeratorRepository
    ) {}

    // public async getOne(id: number): Promise<ModeratorGetOutputDTO> {
    //     const moderatorInstance = await this.moderatorRepository.getOne(id)

    //     if (!moderatorInstance) {
    //         throw new ModeratorNotFoundWithIdError(id)
    //     }

    //     return this.moderatorGetMapper.toDto(moderatorInstance)
    // }

    // public async getMany(): Promise<ModeratorGetOutputDTO[]> {
    //     const moderatorInstances = await this.moderatorRepository.getMany()
    //     return mapManyModels(moderatorInstances, this.moderatorGetMapper.toDto)
    // }

    public async create(moderatorData: ModeratorCreateInputDto): Promise<ModeratorCreateOutputDto> {
        const moderatorCreateInput = this.moderatorCreateMapper.toDbModel(moderatorData)
        const moderatorCreatedInstance = await this.moderatorRepository.create(moderatorCreateInput)
        return this.moderatorCreateMapper.toDto(moderatorCreatedInstance)
    }

}