import { PrismaClient } from "@prisma/client";
import BaseRepository from "./BaseRepository";
import { CourierCreateInput, CourierDelegate, CourierModel, CourierUpdateInput } from "./types/courier.type";


export default class CourierRepository extends BaseRepository<CourierDelegate, CourierModel, CourierCreateInput, CourierUpdateInput> {

    constructor(prisma: PrismaClient) {
        super(prisma.courier)
    }
    
}