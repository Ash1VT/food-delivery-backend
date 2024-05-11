import { getPrismaClient } from "@src/core/setup/prisma";
import { MenuItemCreatedBaseEvent, MenuItemDeletedBaseEvent, MenuItemUpdatedBaseEvent } from "../abstractions/menuItem.events";
import PrismaMenuItemRepositoryFactory from "@src/modules/menu/repositories/factories/implementations/prisma/PrismaMenuItemRepositoryFactory";

export class MenuItemCreatedPrismaEvent extends MenuItemCreatedBaseEvent {

    constructor(
        data: any
    ) {
        const prismaClient = getPrismaClient()
        const menuItemRepositoryFactory = new PrismaMenuItemRepositoryFactory(prismaClient)
        super(data, menuItemRepositoryFactory)
    }
}

export class MenuItemUpdatedPrismaEvent extends MenuItemUpdatedBaseEvent {

    constructor(
        data: any
    ) {
        const prismaClient = getPrismaClient()
        const menuItemRepositoryFactory = new PrismaMenuItemRepositoryFactory(prismaClient)
        super(data, menuItemRepositoryFactory)
    }
}

export class MenuItemDeletedPrismaEvent extends MenuItemDeletedBaseEvent {

    constructor(
        data: any
    ) {
        const prismaClient = getPrismaClient()
        const menuItemRepositoryFactory = new PrismaMenuItemRepositoryFactory(prismaClient)
        super(data, menuItemRepositoryFactory)
    }
}