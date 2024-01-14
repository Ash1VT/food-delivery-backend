import { PrismaClient } from "@prisma/client";
import { MenuItemCreateInput, MenuItemDelegate, MenuItemModel, MenuItemUpdateInput } from "./types/menuItem.type";
import BaseRepository from "./BaseRepository";


export default class MenuItemRepository extends BaseRepository<MenuItemDelegate, MenuItemModel, MenuItemCreateInput, MenuItemUpdateInput> {

    constructor(prisma: PrismaClient) {
        super(prisma.menuItem)
    }
    
}