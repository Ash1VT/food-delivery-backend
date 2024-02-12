import IUserMapperFactory from "@src/modules/users/mappers/factories/interfaces/IUserMapperFactory";
import CustomerService from "../../../implementations/CustomerService";
import ICourierService from "../../../interfaces/ICourierService";
import ICustomerService from "../../../interfaces/ICustomerService";
import IModeratorService from "../../../interfaces/IModeratorService";
import IRestaurantManagerService from "../../../interfaces/IRestaurantManagerService";
import IUserServiceFactory from "../../interfaces/IUserServiceFactory";
import IUserRepositoryFactory from "@src/modules/users/repositories/factories/interfaces/IUserRepositoryFactory";
import CourierService from "../../../implementations/CourierService";
import RestaurantManagerService from "../../../implementations/RestaurantManagerService";
import ModeratorService from "../../../implementations/ModeratorService";
import PrismaUserRepositoryFactory from "@src/modules/users/repositories/factories/implementations/prisma/PrismaUserRepositoryFactory";
import { PrismaClient } from "@prisma/client";
import UserMapperFactory from "@src/modules/users/mappers/factories/implementations/UserMapperFactory";

export default class PrismaUserServiceFactory implements IUserServiceFactory {
    protected userMapperFactory: IUserMapperFactory = new UserMapperFactory()
    protected userRepositoryFactory: IUserRepositoryFactory
    
    constructor(prismaClient: PrismaClient) {
        this.userRepositoryFactory = new PrismaUserRepositoryFactory(prismaClient)
    }

    public createCustomerService(): ICustomerService {
        return new CustomerService(
            this.userMapperFactory.createCustomerCreateMapper(), 
            this.userRepositoryFactory.createCustomerRepository()
        )
    }
    
    public createCourierService(): ICourierService {
        return new CourierService(
            this.userMapperFactory.createCourierCreateMapper(), 
            this.userRepositoryFactory.createCourierRepository()
        )
    }
    
    public createRestaurantManager(): IRestaurantManagerService {
        return new RestaurantManagerService(
            this.userMapperFactory.createRestaurantManagerCreateMapper(), 
            this.userRepositoryFactory.createRestaurantManagerRepository()
        )
    }

    public createModeratorService(): IModeratorService {
        return new ModeratorService(
            this.userMapperFactory.createModeratorCreateMapper(), 
            this.userRepositoryFactory.createModeratorRepository()
        )
    }

}