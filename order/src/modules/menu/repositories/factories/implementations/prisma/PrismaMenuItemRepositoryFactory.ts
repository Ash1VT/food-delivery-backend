import { PrismaClient } from "@prisma/client";
import PrismaMenuItemRepository from "../../../implementations/prisma/PrismaMenuItemRepository";
import IMenuItemRepository from "../../../interfaces/IMenuItemRepository";
import IMenuItemRepositoryFactory from "../../interfaces/IMenuItemRepositoryFactory";

export default class PrismaMenuItemRepositoryFactory implements IMenuItemRepositoryFactory {
    constructor(
        protected prismaClient: PrismaClient
    ) {}

    public createMenuItemRepository(): IMenuItemRepository {
        return new PrismaMenuItemRepository(this.prismaClient)
    }
}