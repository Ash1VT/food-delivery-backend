import ICreateService from "@src/base/services/interfaces/ICreateService";
import IGetService from "@src/base/services/interfaces/IGetService";
import { ModeratorGetOutputDTO, ModeratorCreateInputDTO, ModeratorCreateOutputDTO } from "../../dto/moderator";

export default interface IModeratorService extends IGetService<ModeratorGetOutputDTO>, ICreateService<ModeratorCreateInputDTO, ModeratorCreateOutputDTO> {}