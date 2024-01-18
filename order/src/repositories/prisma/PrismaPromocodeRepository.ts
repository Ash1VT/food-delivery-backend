import { PrismaClient } from "@prisma/client";
import { PromocodeCreateInput, PromocodeModel, PromocodeUpdateInput } from "../../models/promocode";
import PrismaBaseRepository from "./PrismaBaseRepository";
import IPromocodeRepository from "../interfaces/IPromocodeRepository";
import { PromocodeDelegate } from "../types/prisma/delegate.type";


export default class PrismaPromocodeRepository extends PrismaBaseRepository<PromocodeDelegate, PromocodeModel, PromocodeCreateInput, PromocodeUpdateInput>
                                               implements IPromocodeRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.promocode)
    }

}