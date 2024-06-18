import { PrismaClient } from "@prisma/client";
import PrismaPromocodeRepository from "../../../implementations/prisma/PrismaPromocodeRepository";
import IPromocodeRepository from "../../../interfaces/IPromocodeRepository";
import IPromotionRepositoryFactory from "../../interfaces/IPromotionRepositoryFactory";

export default class PrismaPromotionRepositoryFactory implements IPromotionRepositoryFactory {
    constructor(
        protected prismaClient: PrismaClient
    ) {}

    public createPromocodeRepository(): IPromocodeRepository {
        return new PrismaPromocodeRepository(this.prismaClient)
    }

}