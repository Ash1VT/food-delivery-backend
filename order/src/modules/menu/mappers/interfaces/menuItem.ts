import { MenuItemCreateOutputDTO, MenuItemCreateInputDTO, MenuItemUpdateOutputDTO, MenuItemUpdateInputDTO, MenuItemGetOutputDTO } from "../../dto/menuItem";
import { MenuItemCreateInput, MenuItemModel, MenuItemUpdateInput } from "../../models/menuItem";

export interface IMenuItemGetMapper {
    toDto(dbModel: MenuItemModel): MenuItemGetOutputDTO
}

export interface IMenuItemCreateMapper {
    toDto(dbModel: MenuItemModel): MenuItemCreateOutputDTO
    toDbModel(dtoModel: MenuItemCreateInputDTO): MenuItemCreateInput
}

export interface IMenuItemUpdateMapper {
    toDto(dbModel: MenuItemModel): MenuItemUpdateOutputDTO
    toDbModel(dtoModel: MenuItemUpdateInputDTO): MenuItemUpdateInput
}