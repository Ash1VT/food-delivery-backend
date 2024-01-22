import { MenuItemCreateOutputDTO, MenuItemCreateInputDTO, MenuItemUpdateOutputDTO, MenuItemUpdateInputDTO, MenuItemGetOutputDTO } from "../../../dto/menuItem";
import { MenuItemCreateInput, MenuItemModel, MenuItemUpdateInput } from "../../../models/menuItem";
import { MenuItemCreateAdditionalData, MenuItemUpdateAdditionalData } from "../../types/additionalData";
import DatabaseToDtoMapper from "../IDatabaseToDtoMapper";
import DtoToDatabaseMapper from "../IDtoToDatabaseMapper";
import IObjectToDtoMapper from "../ObjectToDtoMapper";


export interface IMenuItemCreateMapper extends DatabaseToDtoMapper<MenuItemModel, MenuItemCreateOutputDTO>,
                                              DtoToDatabaseMapper<MenuItemCreateInputDTO, MenuItemCreateInput, MenuItemCreateAdditionalData>,
                                              IObjectToDtoMapper<MenuItemCreateInputDTO> {}

export interface IMenuItemUpdateMapper extends DatabaseToDtoMapper<MenuItemModel, MenuItemUpdateOutputDTO>,
                                              DtoToDatabaseMapper<MenuItemUpdateInputDTO, MenuItemUpdateInput, MenuItemUpdateAdditionalData>,
                                              IObjectToDtoMapper<MenuItemUpdateInputDTO> {}

export interface IMenuItemGetMapper extends DatabaseToDtoMapper<MenuItemModel, MenuItemGetOutputDTO> {}