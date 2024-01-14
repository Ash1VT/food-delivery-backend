import { PrismaClient } from "@prisma/client";
import BaseRepository from "./BaseRepository";
import { RestaurantManagerDelegate, RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput } from "./types/restaurantManager.type";


export default class RestaurantManagerRepository extends BaseRepository<RestaurantManagerDelegate, RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput> {

    constructor(prisma: PrismaClient) {
        super(prisma.restaurantManager)
    }
    
}