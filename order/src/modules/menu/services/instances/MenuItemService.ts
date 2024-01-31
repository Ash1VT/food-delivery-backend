import { mapManyModels } from "@src/utils/mapManyModels";
import { MenuItemCreateInputDTO, MenuItemCreateOutputDTO, MenuItemGetOutputDTO } from "../../dto/menuItem";
import { MenuItemNotFoundWithIdError } from "../../errors/menuItem";
import { IMenuItemCreateMapper, IMenuItemGetMapper } from "../../mappers/interfaces/menuItem";
import IMenuItemRepository from "../../repositories/interfaces/IMenuItemRepository";
import IMenuItemService from "../interfaces/IMenuItemService";

export default class MenuItemService implements IMenuItemService {

    constructor(
        protected menuItemGetMapper: IMenuItemGetMapper,
        protected menuItemCreateMapper: IMenuItemCreateMapper,
        protected menuItemRepository: IMenuItemRepository
    ) {}

    public async getOne(id: number): Promise<MenuItemGetOutputDTO> {
        const menuItemInstance = await this.menuItemRepository.getOne(id)

        if (!menuItemInstance) {
            throw new MenuItemNotFoundWithIdError(id)
        }

        return this.menuItemGetMapper.toDto(menuItemInstance)
    }

    public async getMany(): Promise<MenuItemGetOutputDTO[]> {
        const menuItemInstances = await this.menuItemRepository.getMany()
        return mapManyModels(menuItemInstances, this.menuItemGetMapper.toDto)
    }
    
    public async create(data: MenuItemCreateInputDTO): Promise<MenuItemCreateOutputDTO> {
        const menuItemCreateInput = this.menuItemCreateMapper.toDbModel(data)
        const menuItemCreatedInstance = await this.menuItemRepository.create(menuItemCreateInput)
        return this.menuItemCreateMapper.toDto(menuItemCreatedInstance)
    }
}