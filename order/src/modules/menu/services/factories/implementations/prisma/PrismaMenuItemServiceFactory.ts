import { PrismaClient } from "@prisma/client"
import MenuItemService from "../../../implementations/MenuItemService"
import IMenuItemService from "../../../interfaces/IMenuItemService"
import IMenuServiceFactory from "../../interfaces/IMenuItemServiceFactory"
import { IMenuItemMapperFactory } from "@src/modules/menu/mappers/factories/interfaces/IMenuItemMapperFactory"
import PrismaMenuItemRepositoryFactory from "@src/modules/menu/repositories/factories/implementations/prisma/PrismaMenuItemRepositoryFactory"
import IMenuItemRepositoryFactory from "@src/modules/menu/repositories/factories/interfaces/IMenuItemRepositoryFactory"
import { MenuItemMapperFactory } from "@src/modules/menu/mappers/factories/implementations/MenuItemMapperFactory"

export default class PrismaMenuItemServiceFactory implements IMenuServiceFactory {
    protected menuItemMapperFactory: IMenuItemMapperFactory = new MenuItemMapperFactory()
    protected menuItemRepositoryFactory: IMenuItemRepositoryFactory

    constructor(prismaClient: PrismaClient) {
        this.menuItemRepositoryFactory = new PrismaMenuItemRepositoryFactory(prismaClient)
    }

    public createMenuItemService(): IMenuItemService {
        return new MenuItemService(
            this.menuItemMapperFactory.createMenuItemCreateMapper(),
            this.menuItemRepositoryFactory.createMenuItemRepository()
        )
    }
}