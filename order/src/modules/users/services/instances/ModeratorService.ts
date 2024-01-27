import { ModeratorGetOutputDTO, ModeratorCreateInputDTO, ModeratorCreateOutputDTO } from "../../dto/moderator";
import { ModeratorNotFoundWithIdError } from "../../errors/moderator";
import { IModeratorGetMapper, IModeratorCreateMapper } from "../../mappers/interfaces/moderator";
import IModeratorRepository from "../../repositories/interfaces/IModeratorRepository";
import IModeratorService from "../interfaces/IModeratorService";

export default class ModeratorService implements IModeratorService {
    
    constructor(
        protected moderatorGetMapper: IModeratorGetMapper,
        protected moderatorCreateMapper: IModeratorCreateMapper,
        protected moderatorRepository: IModeratorRepository
    ) {}

    public async getOne(id: number): Promise<ModeratorGetOutputDTO> {
        const moderatorInstance = await this.moderatorRepository.getOne(id)

        if (!moderatorInstance) {
            throw new ModeratorNotFoundWithIdError(id)
        }

        return this.moderatorGetMapper.toDto(moderatorInstance, {})
    }

    public async getMany(): Promise<ModeratorGetOutputDTO[]> {
        const moderatorInstances = await this.moderatorRepository.getMany()
        return this.moderatorGetMapper.toDtos(moderatorInstances, [])
    }

    public async create(data: ModeratorCreateInputDTO): Promise<ModeratorCreateOutputDTO> {
        const moderatorCreateInput = await this.moderatorCreateMapper.toDbModel(data, {})
        const moderatorCreatedInstance = await this.moderatorRepository.create(moderatorCreateInput)
        return this.moderatorCreateMapper.toDto(moderatorCreatedInstance, {})
    }

}