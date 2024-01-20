import { ModeratorModel, ModeratorCreateInput, ModeratorUpdateInput } from "../../models/moderator";
import IBaseRepository from "./IBaseRepository";

export default interface IModeratorRepository
                         extends IBaseRepository<ModeratorModel, ModeratorCreateInput, ModeratorUpdateInput> {

}