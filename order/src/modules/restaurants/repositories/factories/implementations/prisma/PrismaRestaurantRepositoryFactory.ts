import { PrismaClient } from "@prisma/client";
import PrismaRestaurantRepository from "../../../implementations/prisma/PrismaRestaurantRepository";
import IRestaurantRepository from "../../../interfaces/IRestaurantRepository";
import IRestaurantRepositoryFactory from "../../interfaces/IRestaurantRepositoryFactory";
import IWorkingHoursRepository from "../../../interfaces/IWorkingHoursRepository";
import PrismaWorkingHoursRepository from "../../../implementations/prisma/PrismaWorkingHoursRepository";

export default class PrismaRestaurantRepositoryFactory implements IRestaurantRepositoryFactory {
    constructor(
        protected prismaClient: PrismaClient
    ) {}

    public createRestaurantRepository(): IRestaurantRepository {
        return new PrismaRestaurantRepository(this.prismaClient)
    }

    public createWorkingHoursRepository(): IWorkingHoursRepository {
        return new PrismaWorkingHoursRepository(this.prismaClient)
    }
}