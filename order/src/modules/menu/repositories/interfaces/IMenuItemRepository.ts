import { MenuItemCreateInput, MenuItemModel, MenuItemUpdateInput } from "../../models/menuItem";
import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";

export default interface IMenuItemRepository
                         extends IBaseRepository<MenuItemModel, MenuItemCreateInput, MenuItemUpdateInput> {

}