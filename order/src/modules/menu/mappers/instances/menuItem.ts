import { MenuItemCreateInputDTO, MenuItemCreateOutputDTO, MenuItemGetOutputDTO, MenuItemUpdateInputDTO, MenuItemUpdateOutputDTO } from "../../dto/menuItem";
import { MenuItemCreateInput, MenuItemModel, MenuItemUpdateInput } from "../../models/menuItem";
import { IMenuItemGetMapper, IMenuItemCreateMapper, IMenuItemUpdateMapper } from "../interfaces/menuItem";

export class MenuItemGetMapper implements IMenuItemGetMapper {

    toDto(dbModel: MenuItemModel): MenuItemGetOutputDTO {
        return {
            id: Number(dbModel.id),
            name: dbModel.name,
            imageUrl: dbModel.imageUrl,
            price: dbModel.price,
            restaurantId: Number(dbModel.restaurantId)
        }
    }

}

export class MenuItemCreateMapper implements IMenuItemCreateMapper {

    toDto(dbModel: MenuItemModel): MenuItemCreateOutputDTO {
        return {
            id: Number(dbModel.id),
            name: dbModel.name,
            imageUrl: dbModel.imageUrl,
            price: dbModel.price,
            restaurantId: Number(dbModel.restaurantId)
        }
    }

    toDbModel(dtoModel: MenuItemCreateInputDTO): MenuItemCreateInput {
        return {
            id: BigInt(dtoModel.id),
            restaurantId: BigInt(dtoModel.restaurantId),
            name: dtoModel.name,
            imageUrl: dtoModel.imageUrl,
            price: dtoModel.price
        }
    }

}

export class MenuItemUpdateMapper implements IMenuItemUpdateMapper {

    toDto(dbModel: MenuItemModel): MenuItemUpdateOutputDTO {
        return {
            id: Number(dbModel.id),
            name: dbModel.name,
            imageUrl: dbModel.imageUrl,
            price: dbModel.price,
            restaurantId: Number(dbModel.restaurantId)
        }
    }

    toDbModel(dtoModel: MenuItemUpdateInputDTO): MenuItemUpdateInput {
        return {
            name: dtoModel.name,
            imageUrl: dtoModel.imageUrl,
            price: dtoModel.price
        }
    }

}
