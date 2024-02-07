import { MenuItemCreateInputDTO, MenuItemCreateOutputDTO, MenuItemGetOutputDTO, MenuItemUpdateInputDTO, MenuItemUpdateOutputDTO } from "../../dto/menuItem";
import { MenuItemCreateInput, MenuItemModel, MenuItemUpdateInput } from "../../models/menuItem";
import { IMenuItemGetMapper, IMenuItemCreateMapper, IMenuItemUpdateMapper } from "../interfaces/menuItem";

export class MenuItemGetMapper implements IMenuItemGetMapper {

    toDto(dbModel: MenuItemModel): MenuItemGetOutputDTO {
        return {
           ...dbModel
        }
    }

}

export class MenuItemCreateMapper implements IMenuItemCreateMapper {

    toDto(dbModel: MenuItemModel): MenuItemCreateOutputDTO {
        return {
            ...dbModel
        }
    }

    toDbModel(dtoModel: MenuItemCreateInputDTO): MenuItemCreateInput {
        return {
            ...dtoModel
        }
    }

}

export class MenuItemUpdateMapper implements IMenuItemUpdateMapper {

    toDto(dbModel: MenuItemModel): MenuItemUpdateOutputDTO {
        return {
            ...dbModel
        }
    }

    toDbModel(dtoModel: MenuItemUpdateInputDTO): MenuItemUpdateInput {
        return {
            ...dtoModel
        }
    }

}
