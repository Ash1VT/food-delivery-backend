import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "@src/core/repositories/prisma/PrismaBaseRepository";
import { PromotionModel, PromotionCreateInput, PromotionUpdateInput } from "../../../models/promotion.models";
import IPromotionRepository from "../../interfaces/IPromotionRepository";
import { PromotionDelegate } from "./delegates";


export default class PrismaPromotionRepository extends PrismaBaseRepository<PromotionDelegate, PromotionModel, PromotionCreateInput, PromotionUpdateInput>
                                               implements IPromotionRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.promotion)
    }

}