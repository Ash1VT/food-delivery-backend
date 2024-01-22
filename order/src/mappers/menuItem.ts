import { MenuItemCreateInputDTO, MenuItemCreateOutputDTO, MenuItemGetOutputDTO, MenuItemUpdateInputDTO, MenuItemUpdateOutputDTO } from "../dto/menuItem";
import { MenuItemModel } from "../models/menuItem";
import { IMenuItemGetMapper, IMenuItemCreateMapper, IMenuItemUpdateMapper } from "./interfaces/instances/menuItem";

export class MenuItemGetMapper implements IMenuItemGetMapper {

    toDto(dbModel: MenuItemModel): MenuItemGetOutputDTO {
        return {
            id: Number(dbModel.id),
            restaurantId: Number(dbModel.restaurantId)
        }
    }

    toDtos(dbModels: MenuItemModel[]): MenuItemGetOutputDTO[] {
        return dbModels.map((dbModel) => this.toDto(dbModel))
    }

}

export class MenuItemCreateMapper implements IMenuItemCreateMapper {

    toDto(dbModel: MenuItemModel): MenuItemCreateOutputDTO {
        throw new Error("Method not implemented.");
    }

    toDtos(dbModels: MenuItemModel[]): MenuItemCreateOutputDTO[] {
        throw new Error("Method not implemented.");
    }

    toDbModel(dtoModel: MenuItemCreateInputDTO): MenuItemModel {
        throw new Error("Method not implemented.");
    }

    toDbModels(dtoModels: MenuItemCreateInputDTO[]): MenuItemModel[] {
        throw new Error("Method not implemented.");
    }

    parse(data: any): MenuItemCreateInputDTO {
        throw new Error("Method not implemented.");
    }

}

export class MenuItemUpdateMapper implements IMenuItemUpdateMapper {

    toDto(dbModel: MenuItemModel): MenuItemUpdateOutputDTO {
        throw new Error("Method not implemented.");
    }

    toDtos(dbModels: MenuItemModel[]): MenuItemUpdateOutputDTO[] {
        throw new Error("Method not implemented.");
    }

    toDbModel(dtoModel: MenuItemUpdateInputDTO): MenuItemModel {
        throw new Error("Method not implemented.");
    }

    toDbModels(dbModels: MenuItemUpdateInputDTO[]): MenuItemModel[] {
        throw new Error("Method not implemented.");
    }

    parse(data: any): MenuItemUpdateInputDTO {
        throw new Error("Method not implemented.");
    }

}
