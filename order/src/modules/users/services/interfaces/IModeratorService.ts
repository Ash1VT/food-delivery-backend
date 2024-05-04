import IBaseService from "@src/core/services/IBaseService";
import { ModeratorGetOutputDto, ModeratorCreateInputDto, ModeratorCreateOutputDto } from "../../dto/moderator.dto";

export default interface IModeratorService extends IBaseService {
    create(moderatorData: ModeratorCreateInputDto): Promise<ModeratorCreateOutputDto>
}