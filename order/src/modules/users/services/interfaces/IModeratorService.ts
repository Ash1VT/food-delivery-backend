import { ModeratorGetOutputDTO, ModeratorCreateInputDTO, ModeratorCreateOutputDTO } from "../../dto/moderator";

export default interface IModeratorService {
    create(moderatorData: ModeratorCreateInputDTO): Promise<ModeratorCreateOutputDTO>
}