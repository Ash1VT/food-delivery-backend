import { PrismaClient } from "@prisma/client";
import { PromocodeCreateInput, PromocodeModel, PromocodeUpdateInput } from "../../models/promocode";
import PrismaBaseRepository from "../../../../base/repositories/PrismaBaseRepository";
import IPromocodeRepository from "../interfaces/IPromocodeRepository";
import { PromocodeDelegate } from "./delegates";


export default class PrismaPromocodeRepository extends PrismaBaseRepository<PromocodeDelegate, PromocodeModel, PromocodeCreateInput, PromocodeUpdateInput>
                                               implements IPromocodeRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.promocode)
    }

}