import PrismaBaseRepository from "@src/core/repositories/prisma/PrismaBaseRepository";
import { PriceInformationDelegate } from "./delegates";
import { PriceInformationCreateInput, PriceInformationModel, PriceInformationUpdateInput } from "@src/modules/orders/models/priceInformation.models";
import IPriceInformationRepository from "../../interfaces/IPriceInformationRepository";
import { PrismaClient } from "@prisma/client";

export default class PrismaPriceInformationRepository extends PrismaBaseRepository<PriceInformationDelegate, PriceInformationModel, PriceInformationCreateInput, PriceInformationUpdateInput> implements IPriceInformationRepository {
    constructor(prisma: PrismaClient) {
        super(prisma.priceInformation)
    }

}