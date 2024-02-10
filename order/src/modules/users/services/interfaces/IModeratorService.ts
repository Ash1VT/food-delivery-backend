import { ModeratorGetOutputDto, ModeratorCreateInputDto, ModeratorCreateOutputDto } from "../../dto/moderator.dto";

export default interface IModeratorService {
    create(moderatorData: ModeratorCreateInputDto): Promise<ModeratorCreateOutputDto>
}