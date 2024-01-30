import { MenuItemCreateInputDTO, MenuItemCreateOutputDTO, MenuItemGetOutputDTO, MenuItemUpdateInputDTO, MenuItemUpdateOutputDTO } from "../../dto/menuItem";
import { MenuItemModel, MenuItemUpdateInput } from "../../models/menuItem";
import { IMenuItemGetMapper, IMenuItemCreateMapper, IMenuItemUpdateMapper } from "../interfaces/menuItem";

export class MenuItemGetMapper implements IMenuItemGetMapper {

    toDto(dbModel: MenuItemModel): MenuItemGetOutputDTO {
        return {
            id: Number(dbModel.id),
            restaurantId: Number(dbModel.restaurantId)
        }
    }

}

export class MenuItemCreateMapper implements IMenuItemCreateMapper {

    toDto(dbModel: MenuItemModel): MenuItemCreateOutputDTO {
        return {
            id: Number(dbModel.id),
            restaurantId: Number(dbModel.restaurantId)
        }
    }

    toDbModel(dtoModel: MenuItemCreateInputDTO): MenuItemModel {
        return {
            id: BigInt(dtoModel.id),
            restaurantId: BigInt(dtoModel.restaurantId),
            price: dtoModel.price
        }
    }

}

export class MenuItemUpdateMapper implements IMenuItemUpdateMapper {

    toDto(dbModel: MenuItemModel): MenuItemUpdateOutputDTO {
        return {
            id: Number(dbModel.id),
            restaurantId: Number(dbModel.restaurantId)
        }
    }

    toDbModel(dtoModel: MenuItemUpdateInputDTO): MenuItemUpdateInput {
        return {
            price: dtoModel.price
        }
    }

}
