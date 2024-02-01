import { MenuItemCreateInputDTO, MenuItemCreateOutputDTO, MenuItemGetOutputDTO, MenuItemUpdateOutputDTO } from "../../dto/menuItem";

export default interface IMenuItemService {
    // getOne(menuItemId: number): Promise<MenuItemGetOutputDTO>
    create(menuItemData: MenuItemCreateInputDTO): Promise<MenuItemCreateOutputDTO>
}