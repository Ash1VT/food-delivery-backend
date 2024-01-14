import { PrismaClient } from "@prisma/client";
import BaseRepository from "./BaseRepository";
import { RestaurantDelegate, RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput } from "./types/restaurant.type";


export default class RestaurantRepository extends BaseRepository<RestaurantDelegate, RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput> {

    constructor(prisma: PrismaClient) {
        super(prisma.restaurant)
    }
    
}