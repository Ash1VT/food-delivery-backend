import IBaseService from "@src/core/services/IBaseService";
import { MenuItemCreateInputDto, MenuItemCreateOutputDto, MenuItemUpdateInputDto, MenuItemUpdateOutputDto } from "../../dto/menuItem.dto";

export default interface IMenuItemService extends IBaseService{
    create(menuItemData: MenuItemCreateInputDto): Promise<MenuItemCreateOutputDto>
    update(menuItemId: bigint, menuItemData: MenuItemUpdateInputDto): Promise<MenuItemUpdateOutputDto>
    delete(menuItemId: bigint): Promise<void>
}