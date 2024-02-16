import IBaseService from "@src/core/services/IBaseService";
import { MenuItemCreateInputDto, MenuItemCreateOutputDto, MenuItemGetOutputDto, MenuItemUpdateOutputDto } from "../../dto/menuItem.dto";

export default interface IMenuItemService extends IBaseService{
    // getOne(menuItemId: number): Promise<MenuItemGetOutputDTO>
    create(menuItemData: MenuItemCreateInputDto): Promise<MenuItemCreateOutputDto>
}