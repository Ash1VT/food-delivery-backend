import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "./PrismaBaseRepository";
import { PromotionModel, PromotionCreateInput, PromotionUpdateInput } from "../../models/promotion";
import IPromotionRepository from "../interfaces/IPromotionRepository";
import { PromotionDelegate } from "../types/prisma/delegate.type";


export default class PrismaPromotionRepository extends PrismaBaseRepository<PromotionDelegate, PromotionModel, PromotionCreateInput, PromotionUpdateInput>
                                               implements IPromotionRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.promotion)
    }

}