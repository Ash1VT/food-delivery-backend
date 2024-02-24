import { getPrismaClient } from "@src/core/setup/prisma";
import { MenuItemCreatedBaseEvent, MenuItemDeletedBaseEvent, MenuItemUpdatedBaseEvent } from "../abstractions/menuItem.events";
import PrismaMenuItemServiceFactory from "@src/modules/menu/services/factories/implementations/prisma/PrismaMenuItemServiceFactory";

export class MenuItemCreatedPrismaEvent extends MenuItemCreatedBaseEvent {

    constructor(
        data: object
    ) {
        const prismaClient = getPrismaClient()
        const menuItemServiceFactory = new PrismaMenuItemServiceFactory(prismaClient)
        super(data, menuItemServiceFactory)
    }
}

export class MenuItemUpdatedPrismaEvent extends MenuItemUpdatedBaseEvent {

    constructor(
        data: object
    ) {
        const prismaClient = getPrismaClient()
        const menuItemServiceFactory = new PrismaMenuItemServiceFactory(prismaClient)
        super(data, menuItemServiceFactory)
    }
}

export class MenuItemDeletedPrismaEvent extends MenuItemDeletedBaseEvent {

    constructor(
        data: object
    ) {
        const prismaClient = getPrismaClient()
        const menuItemServiceFactory = new PrismaMenuItemServiceFactory(prismaClient)
        super(data, menuItemServiceFactory)
    }
}