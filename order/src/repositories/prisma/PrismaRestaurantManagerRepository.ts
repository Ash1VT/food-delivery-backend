import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "./PrismaBaseRepository";
import { RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput } from "../../models/restaurantManager";
import IRestaurantManagerRepository from "../interfaces/IRestaurantManagerRepository";
import { RestaurantManagerDelegate } from "../types/prisma/delegate.type";


export default class PrismaRestaurantManagerRepository extends PrismaBaseRepository<RestaurantManagerDelegate, RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput>
                                                       implements IRestaurantManagerRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.restaurantManager)
    }
    
}