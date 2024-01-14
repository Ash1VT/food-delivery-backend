import { PrismaClient } from "@prisma/client";
import { PromocodeCreateInput, PromocodeDelegate, PromocodeModel, PromocodeUpdateInput } from "./types/promocode.type";
import BaseRepository from "./BaseRepository";


export default class PromocodeRepository extends BaseRepository<PromocodeDelegate, PromocodeModel, PromocodeCreateInput, PromocodeUpdateInput> {

    constructor(prisma: PrismaClient) {
        super(prisma.promocode)
    }

}