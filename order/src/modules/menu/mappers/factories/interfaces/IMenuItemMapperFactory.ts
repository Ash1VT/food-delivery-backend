import { IMenuItemGetMapper, IMenuItemCreateMapper, IMenuItemUpdateMapper } from "../../interfaces/menuItem.mappers";

export interface IMenuItemMapperFactory {
    createMenuItemGetMapper(): IMenuItemGetMapper;
    createMenuItemCreateMapper(): IMenuItemCreateMapper;
    createMenuItemUpdateMapper(): IMenuItemUpdateMapper;
}