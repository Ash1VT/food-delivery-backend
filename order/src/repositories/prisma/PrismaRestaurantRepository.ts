import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "./PrismaBaseRepository";
import { RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput } from "../../models/restaurant";
import IRestaurantRepository from "../interfaces/IRestaurantRepository";
import { RestaurantDelegate } from "../types/prisma/delegate.type";


export default class PrismaRestaurantRepository extends PrismaBaseRepository<RestaurantDelegate, RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput>
                                                implements IRestaurantRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.restaurant)
    }
    
}