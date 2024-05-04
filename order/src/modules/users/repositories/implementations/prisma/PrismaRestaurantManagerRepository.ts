import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "@src/core/repositories/prisma/PrismaBaseRepository";
import { RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput } from "../../../models/restaurantManager.models";
import IRestaurantManagerRepository from "../../interfaces/IRestaurantManagerRepository";
import { RestaurantManagerDelegate } from "./delegates";


export default class PrismaRestaurantManagerRepository extends PrismaBaseRepository<RestaurantManagerDelegate, RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput> implements IRestaurantManagerRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.restaurantManager)
    }
    
}