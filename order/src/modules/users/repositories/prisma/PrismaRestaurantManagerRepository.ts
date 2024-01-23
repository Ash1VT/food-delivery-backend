import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "../../../../base/repositories/PrismaBaseRepository";
import { RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput } from "../../models/restaurantManager";
import IRestaurantManagerRepository from "../interfaces/IRestaurantManagerRepository";
import { RestaurantManagerDelegate } from "./delegates";


export default class PrismaRestaurantManagerRepository extends PrismaBaseRepository<RestaurantManagerDelegate, RestaurantManagerModel, RestaurantManagerCreateInput, RestaurantManagerUpdateInput>
                                                       implements IRestaurantManagerRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.restaurantManager)
    }
    
}