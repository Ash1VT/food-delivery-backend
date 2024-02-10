import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "@src/core/repositories/prisma/PrismaBaseRepository";
import { CourierCreateInput, CourierModel, CourierUpdateInput } from "../../../models/courier.models";
import ICourierRepository from "../../interfaces/ICourierRepository";
import { CourierDelegate } from "./delegates";


export default class PrismaCourierRepository extends PrismaBaseRepository<CourierDelegate, CourierModel, CourierCreateInput, CourierUpdateInput> implements ICourierRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.courier)
    }
    
}