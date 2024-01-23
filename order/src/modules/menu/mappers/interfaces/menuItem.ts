import { MenuItemCreateOutputDTO, MenuItemCreateInputDTO, MenuItemUpdateOutputDTO, MenuItemUpdateInputDTO, MenuItemGetOutputDTO } from "../../dto/menuItem";
import { MenuItemCreateInput, MenuItemModel, MenuItemUpdateInput } from "../../models/menuItem";
import DatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";
import { MenuItemCreateDbModelAdditionalData, MenuItemCreateDtoModelAdditionalData, MenuItemGetDtoModelAdditionalData, MenuItemUpdateDbModelAdditionalData, MenuItemUpdateDtoModelAdditionalData } from "../additionalData";


export interface IMenuItemCreateMapper extends DatabaseToDtoMapper<MenuItemModel, MenuItemCreateOutputDTO, MenuItemCreateDtoModelAdditionalData>,
                                              DtoToDatabaseMapper<MenuItemCreateInputDTO, MenuItemCreateInput, MenuItemCreateDbModelAdditionalData> {}

export interface IMenuItemUpdateMapper extends DatabaseToDtoMapper<MenuItemModel, MenuItemUpdateOutputDTO, MenuItemUpdateDtoModelAdditionalData>,
                                              DtoToDatabaseMapper<MenuItemUpdateInputDTO, MenuItemUpdateInput, MenuItemUpdateDbModelAdditionalData> {}

export interface IMenuItemGetMapper extends DatabaseToDtoMapper<MenuItemModel, MenuItemGetOutputDTO, MenuItemGetDtoModelAdditionalData> {}