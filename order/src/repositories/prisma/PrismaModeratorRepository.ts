import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "./PrismaBaseRepository";
import { ModeratorModel, ModeratorCreateInput, ModeratorUpdateInput } from "../../models/moderator";
import IModeratorRepository from "../interfaces/IModeratorRepository";
import { ModeratorDelegate } from "../types/prisma/delegate.type";


export default class PrismaModeratorRepository extends PrismaBaseRepository<ModeratorDelegate, ModeratorModel, ModeratorCreateInput, ModeratorUpdateInput>
                                               implements IModeratorRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.moderator)
    }
    
}