import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "@src/core/repositories/prisma/PrismaBaseRepository";
import { PaymentInformationCreateInput, PaymentInformationModel, PaymentInformationUpdateInput } from "@src/modules/orders/models/paymentInformation.models";
import { PaymentInformationDelegate } from "./delegates";
import IPaymentInformationRepository from "../../interfaces/IPaymentInformationRepository";

export default class PrismaPaymentInformationRepository extends PrismaBaseRepository<PaymentInformationDelegate, PaymentInformationModel, PaymentInformationCreateInput, PaymentInformationUpdateInput> implements IPaymentInformationRepository {
    constructor(prisma: PrismaClient) {
        super(prisma.paymentInformation)
    }

}