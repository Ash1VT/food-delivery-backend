import { MenuItemCreateInput, MenuItemModel, MenuItemUpdateInput } from "../../models/menuItem";
import IBaseRepository from "@src/base/repositories/interfaces/IBaseRepository";

export default interface IMenuItemRepository
                         extends IBaseRepository<MenuItemModel, MenuItemCreateInput, MenuItemUpdateInput> {

}