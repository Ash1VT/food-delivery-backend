import { PrismaClient } from "@prisma/client";
import BaseRepository from "./BaseRepository";
import { ModeratorDelegate, ModeratorModel, ModeratorCreateInput, ModeratorUpdateInput } from "./types/moderator.type";


export default class ModeratorRepository extends BaseRepository<ModeratorDelegate, ModeratorModel, ModeratorCreateInput, ModeratorUpdateInput> {

    constructor(prisma: PrismaClient) {
        super(prisma.moderator)
    }
    
}