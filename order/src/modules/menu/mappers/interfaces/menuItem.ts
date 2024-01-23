import { MenuItemCreateOutputDTO, MenuItemCreateInputDTO, MenuItemUpdateOutputDTO, MenuItemUpdateInputDTO, MenuItemGetOutputDTO } from "../../dto/menuItem";
import { MenuItemCreateInput, MenuItemModel, MenuItemUpdateInput } from "../../models/menuItem";
import IDatabaseToDtoMapper from "../../../../base/mappers/interfaces/IDatabaseToDtoMapper";
import IDtoToDatabaseMapper from "../../../../base/mappers/interfaces/IDtoToDatabaseMapper";
import { MenuItemCreateDbModelAdditionalData, MenuItemCreateDtoModelAdditionalData, MenuItemGetDtoModelAdditionalData, MenuItemUpdateDbModelAdditionalData, MenuItemUpdateDtoModelAdditionalData } from "../additionalData";


export interface IMenuItemCreateMapper extends IDatabaseToDtoMapper<MenuItemModel, MenuItemCreateOutputDTO, MenuItemCreateDtoModelAdditionalData>,
                                              IDtoToDatabaseMapper<MenuItemCreateInputDTO, MenuItemCreateInput, MenuItemCreateDbModelAdditionalData> {}

export interface IMenuItemUpdateMapper extends IDatabaseToDtoMapper<MenuItemModel, MenuItemUpdateOutputDTO, MenuItemUpdateDtoModelAdditionalData>,
                                              IDtoToDatabaseMapper<MenuItemUpdateInputDTO, MenuItemUpdateInput, MenuItemUpdateDbModelAdditionalData> {}

export interface IMenuItemGetMapper extends IDatabaseToDtoMapper<MenuItemModel, MenuItemGetOutputDTO, MenuItemGetDtoModelAdditionalData> {}