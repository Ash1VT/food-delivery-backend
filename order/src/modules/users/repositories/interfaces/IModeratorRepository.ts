import { ModeratorModel, ModeratorCreateInput, ModeratorUpdateInput } from "../../models/moderator";
import IBaseRepository from "@src/base/repositories/interfaces/IBaseRepository";

export default interface IModeratorRepository
                         extends IBaseRepository<ModeratorModel, ModeratorCreateInput, ModeratorUpdateInput> {

}