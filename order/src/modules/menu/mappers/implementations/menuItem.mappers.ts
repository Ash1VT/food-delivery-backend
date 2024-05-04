import { MenuItemCreateInputDto, MenuItemCreateOutputDto, MenuItemGetOutputDto, MenuItemUpdateInputDto, MenuItemUpdateOutputDto } from "../../dto/menuItem.dto";
import { MenuItemCreateInput, MenuItemModel, MenuItemUpdateInput } from "../../models/menuItem.models";
import { IMenuItemGetMapper, IMenuItemCreateMapper, IMenuItemUpdateMapper } from "../interfaces/menuItem.mappers";

export class MenuItemGetMapper implements IMenuItemGetMapper {

    toDto(dbModel: MenuItemModel): MenuItemGetOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            restaurantId: dbModel.restaurantId.toString()
        }
    }

}

export class MenuItemCreateMapper implements IMenuItemCreateMapper {

    toDto(dbModel: MenuItemModel): MenuItemCreateOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            restaurantId: dbModel.restaurantId.toString()
        }
    }

    toDbModel(dtoModel: MenuItemCreateInputDto): MenuItemCreateInput {
        return {
            ...dtoModel
        }
    }

}

export class MenuItemUpdateMapper implements IMenuItemUpdateMapper {

    toDto(dbModel: MenuItemModel): MenuItemUpdateOutputDto {
        return {
            ...dbModel,
            id: dbModel.id.toString(),
            restaurantId: dbModel.restaurantId.toString()
        }
    }

    toDbModel(dtoModel: MenuItemUpdateInputDto): MenuItemUpdateInput {
        return {
            ...dtoModel
        }
    }

}
