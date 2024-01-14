import { PrismaClient } from "@prisma/client";
import BaseRepository from "./BaseRepository";
import { PromotionDelegate, PromotionModel, PromotionCreateInput, PromotionUpdateInput } from "./types/promotion.type";


export default class PromotionRepository extends BaseRepository<PromotionDelegate, PromotionModel, PromotionCreateInput, PromotionUpdateInput> {

    constructor(prisma: PrismaClient) {
        super(prisma.promotion)
    }

}