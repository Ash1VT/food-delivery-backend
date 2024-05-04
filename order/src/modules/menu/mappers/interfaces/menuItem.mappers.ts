import { MenuItemCreateOutputDto, MenuItemCreateInputDto, MenuItemUpdateOutputDto, MenuItemUpdateInputDto, MenuItemGetOutputDto } from "../../dto/menuItem.dto";
import { MenuItemCreateInput, MenuItemModel, MenuItemUpdateInput } from "../../models/menuItem.models";

export interface IMenuItemGetMapper {
    toDto(dbModel: MenuItemModel): MenuItemGetOutputDto
}

export interface IMenuItemCreateMapper {
    toDto(dbModel: MenuItemModel): MenuItemCreateOutputDto
    toDbModel(dtoModel: MenuItemCreateInputDto): MenuItemCreateInput
}

export interface IMenuItemUpdateMapper {
    toDto(dbModel: MenuItemModel): MenuItemUpdateOutputDto
    toDbModel(dtoModel: MenuItemUpdateInputDto): MenuItemUpdateInput
}