import { PrismaClient } from "@prisma/client";
import ICourierRepository from "../../../interfaces/ICourierRepository";
import ICustomerRepository from "../../../interfaces/ICustomerRepository";
import IModeratorRepository from "../../../interfaces/IModeratorRepository";
import IRestaurantManagerRepository from "../../../interfaces/IRestaurantManagerRepository";
import IUserRepositoryFactory from "../../interfaces/IUserRepositoryFactory";
import PrismaCustomerRepository from "../../../implementations/prisma/PrismaCustomerRepository";
import PrismaCourierRepository from "../../../implementations/prisma/PrismaCourierRepository";
import PrismaRestaurantManagerRepository from "../../../implementations/prisma/PrismaRestaurantManagerRepository";
import PrismaModeratorRepository from "../../../implementations/prisma/PrismaModeratorRepository";

export default class PrismaUserRepositoryFactory implements IUserRepositoryFactory {

    constructor(
        protected prismaClient: PrismaClient
    ) {}

    public createCustomerRepository(): ICustomerRepository {
        return new PrismaCustomerRepository(this.prismaClient)
    }
    
    public createCourierRepository(): ICourierRepository {
        return new PrismaCourierRepository(this.prismaClient)

    }
    
    public createRestaurantManagerRepository(): IRestaurantManagerRepository {
        return new PrismaRestaurantManagerRepository(this.prismaClient)

    }

    public createModeratorRepository(): IModeratorRepository {
        return new PrismaModeratorRepository(this.prismaClient)
    }

}