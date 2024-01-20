import { MenuItemCreateInput, MenuItemModel, MenuItemUpdateInput } from "../../models/menuItem";
import IBaseRepository from "./IBaseRepository";

export default interface IMenuItemRepository
                         extends IBaseRepository<MenuItemModel, MenuItemCreateInput, MenuItemUpdateInput> {

}