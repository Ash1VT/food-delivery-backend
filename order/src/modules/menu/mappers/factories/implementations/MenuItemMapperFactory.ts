import { MenuItemGetMapper, MenuItemCreateMapper, MenuItemUpdateMapper } from "../../implementations/menuItem.mappers";
import { IMenuItemGetMapper, IMenuItemCreateMapper, IMenuItemUpdateMapper } from "../../interfaces/menuItem.mappers";
import { IMenuItemMapperFactory } from "../interfaces/IMenuItemMapperFactory";

export class MenuItemMapperFactory implements IMenuItemMapperFactory {
    public createMenuItemGetMapper(): IMenuItemGetMapper {
        return new MenuItemGetMapper()
    }

    public createMenuItemCreateMapper(): IMenuItemCreateMapper {
        return new MenuItemCreateMapper()
    }

    public createMenuItemUpdateMapper(): IMenuItemUpdateMapper {
        return new MenuItemUpdateMapper()
    }
}