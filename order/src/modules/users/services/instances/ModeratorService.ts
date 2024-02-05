import { mapManyModels } from "@src/utils/mapManyModels";
import { ModeratorGetOutputDTO, ModeratorCreateInputDTO, ModeratorCreateOutputDTO } from "../../dto/moderator";
import { ModeratorNotFoundWithIdError } from "../../errors/moderator";
import { IModeratorGetMapper, IModeratorCreateMapper } from "../../mappers/interfaces/moderator";
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

    public async create(moderatorData: ModeratorCreateInputDTO): Promise<ModeratorCreateOutputDTO> {
        const moderatorCreateInput = this.moderatorCreateMapper.toDbModel(moderatorData)
        const moderatorCreatedInstance = await this.moderatorRepository.create(moderatorCreateInput)
        return this.moderatorCreateMapper.toDto(moderatorCreatedInstance)
    }

}