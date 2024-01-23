import { MenuItemCreateInputDTO, MenuItemCreateOutputDTO, MenuItemGetOutputDTO, MenuItemUpdateInputDTO, MenuItemUpdateOutputDTO } from "../../dto/menuItem";
import { MenuItemModel, MenuItemUpdateInput } from "../../models/menuItem";
import { IMenuItemGetMapper, IMenuItemCreateMapper, IMenuItemUpdateMapper } from "../interfaces/menuItem";
import { MenuItemGetDtoModelAdditionalData, MenuItemCreateDtoModelAdditionalData, MenuItemCreateDbModelAdditionalData, MenuItemUpdateDtoModelAdditionalData, MenuItemUpdateDbModelAdditionalData } from "../additionalData";
import mapManyModels from "@/utils/mapManyModels";

export class MenuItemGetMapper implements IMenuItemGetMapper {

    toDto(dbModel: MenuItemModel, additionalData: MenuItemGetDtoModelAdditionalData): MenuItemGetOutputDTO {
        return {
            id: Number(dbModel.id),
            restaurantId: Number(dbModel.restaurantId)
        }
    }

    toDtos(dbModels: MenuItemModel[], additionalData: MenuItemGetDtoModelAdditionalData[]): MenuItemGetOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

}

export class MenuItemCreateMapper implements IMenuItemCreateMapper {

    toDto(dbModel: MenuItemModel, additionalData: MenuItemCreateDtoModelAdditionalData): MenuItemCreateOutputDTO {
        return {
            id: Number(dbModel.id),
            restaurantId: Number(dbModel.restaurantId)
        }
    }

    toDtos(dbModels: MenuItemModel[], additionalData: MenuItemCreateDtoModelAdditionalData[]): MenuItemCreateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

    toDbModel(dtoModel: MenuItemCreateInputDTO, additionalData: MenuItemCreateDbModelAdditionalData): MenuItemModel {
        return {
            id: BigInt(dtoModel.id),
            restaurantId: BigInt(dtoModel.restaurantId),
            price: dtoModel.price
        }
    }

    toDbModels(dtoModels: MenuItemCreateInputDTO[], additionalData: MenuItemCreateDbModelAdditionalData[]): MenuItemModel[] {
        return mapManyModels(dtoModels, this.toDbModel, additionalData)
    }
}

export class MenuItemUpdateMapper implements IMenuItemUpdateMapper {

    toDto(dbModel: MenuItemModel, additionalData: MenuItemUpdateDtoModelAdditionalData): MenuItemUpdateOutputDTO {
        return {
            id: Number(dbModel.id),
            restaurantId: Number(dbModel.restaurantId)
        }
    }

    toDtos(dbModels: MenuItemModel[], additionalData: MenuItemUpdateDtoModelAdditionalData[]): MenuItemUpdateOutputDTO[] {
        return mapManyModels(dbModels, this.toDto, additionalData)
    }

    toDbModel(dtoModel: MenuItemUpdateInputDTO, additionalData: MenuItemUpdateDbModelAdditionalData): MenuItemUpdateInput {
        return {
            price: dtoModel.price
        }
    }

    toDbModels(dbModels: MenuItemUpdateInputDTO[], additionalData: MenuItemUpdateDbModelAdditionalData[]): MenuItemUpdateInput[] {
        return mapManyModels(dbModels, this.toDbModel, additionalData)
    }

}
