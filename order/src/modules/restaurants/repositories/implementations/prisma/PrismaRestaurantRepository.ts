import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "@src/core/repositories/prisma/PrismaBaseRepository";
import { RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput } from "../../../models/restaurant.models";
import IRestaurantRepository from "../../interfaces/IRestaurantRepository";
import { RestaurantDelegate } from "./delegates";


export default class PrismaRestaurantRepository extends PrismaBaseRepository<RestaurantDelegate, RestaurantModel, RestaurantCreateInput, RestaurantUpdateInput> implements IRestaurantRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.restaurant)
    }
    
}