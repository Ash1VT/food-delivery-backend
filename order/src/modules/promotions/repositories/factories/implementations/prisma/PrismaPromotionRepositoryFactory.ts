import { PrismaClient } from "@prisma/client";
import PrismaPromocodeRepository from "../../../implementations/prisma/PrismaPromocodeRepository";
import PrismaPromotionRepository from "../../../implementations/prisma/PrismaPromotionRepository";
import IPromocodeRepository from "../../../interfaces/IPromocodeRepository";
import IPromotionRepository from "../../../interfaces/IPromotionRepository";
import IPromotionRepositoryFactory from "../../interfaces/IPromotionRepositoryFactory";

export default class PrismaPromotionRepositoryFactory implements IPromotionRepositoryFactory {
    constructor(
        protected prismaClient: PrismaClient
    ) {}

    public createPromocodeRepository(): IPromocodeRepository {
        return new PrismaPromocodeRepository(this.prismaClient)
    }

    public createPromotionRepository(): IPromotionRepository {
        return new PrismaPromotionRepository(this.prismaClient)
    }
}