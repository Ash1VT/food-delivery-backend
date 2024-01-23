import { PrismaClient } from "@prisma/client";
import { MenuItemCreateInput, MenuItemModel, MenuItemUpdateInput } from "../../models/menuItem";
import PrismaBaseRepository from "@/base/repositories/prisma/PrismaBaseRepository";
import IMenuItemRepository from "../interfaces/IMenuItemRepository";
import { MenuItemDelegate } from "./delegates";


export default class PrismaMenuItemRepository extends PrismaBaseRepository<MenuItemDelegate, MenuItemModel, MenuItemCreateInput, MenuItemUpdateInput> 
                                              implements IMenuItemRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.menuItem)
    }

}