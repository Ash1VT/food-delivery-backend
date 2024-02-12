import { MenuItemCreateInputDto, MenuItemCreateOutputDto, MenuItemGetOutputDto, MenuItemUpdateOutputDto } from "../../dto/menuItem.dto";

export default interface IMenuItemService {
    // getOne(menuItemId: number): Promise<MenuItemGetOutputDTO>
    create(menuItemData: MenuItemCreateInputDto): Promise<MenuItemCreateOutputDto>
}