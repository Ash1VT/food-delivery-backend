import { PrismaClient } from "@prisma/client";
import PrismaRestaurantRepository from "../../../implementations/prisma/PrismaRestaurantRepository";
import IRestaurantRepository from "../../../interfaces/IRestaurantRepository";
import IRestaurantRepositoryFactory from "../../interfaces/IRestaurantRepositoryFactory";

export default class PrismaRestaurantRepositoryFactory implements IRestaurantRepositoryFactory {
    constructor(
        protected prismaClient: PrismaClient
    ) {}

    public createRestaurantRepository(): IRestaurantRepository {
        return new PrismaRestaurantRepository(this.prismaClient)
    }
}