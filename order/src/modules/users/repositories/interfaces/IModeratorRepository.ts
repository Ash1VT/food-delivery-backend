import { ModeratorModel, ModeratorCreateInput, ModeratorUpdateInput } from "../../models/moderator";
import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";

export default interface IModeratorRepository
                         extends IBaseRepository<ModeratorModel, ModeratorCreateInput, ModeratorUpdateInput> {

}