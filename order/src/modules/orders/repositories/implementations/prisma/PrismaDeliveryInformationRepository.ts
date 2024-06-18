import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "@src/core/repositories/prisma/PrismaBaseRepository";
import { DeliveryInformationDelegate } from "./delegates";
import IDeliveryInformationRepository from "../../interfaces/IDeliveryInformationRepository";
import { DeliveryInformationCreateInput, DeliveryInformationModel, DeliveryInformationUpdateInput } from "@src/modules/orders/models/deliveryInformation.models";


export default class PrismaDeliveryInformationRepository extends PrismaBaseRepository<DeliveryInformationDelegate, DeliveryInformationModel, DeliveryInformationCreateInput, DeliveryInformationUpdateInput> implements IDeliveryInformationRepository {
    constructor(prisma: PrismaClient) {
        super(prisma.deliveryInformation)
    }

}
