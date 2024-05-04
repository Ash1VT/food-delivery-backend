import { MenuItemCreateInputDto, MenuItemCreateOutputDto, MenuItemGetOutputDto, MenuItemUpdateInputDto, MenuItemUpdateOutputDto } from "../../dto/menuItem.dto";
import { IMenuItemCreateMapper, IMenuItemGetMapper, IMenuItemUpdateMapper } from "../../mappers/interfaces/menuItem.mappers";
import BaseService from '@src/core/services/BaseService';
import IMenuItemRepository from "../../repositories/interfaces/IMenuItemRepository";
import IMenuItemService from "../interfaces/IMenuItemService";
import { MenuItemNotFoundWithIdError } from "../../errors/menuItem.errors";
import { MenuItemModel } from "../../models/menuItem.models";

export default class MenuItemService extends BaseService implements IMenuItemService {

    constructor(
        protected menuItemCreateMapper: IMenuItemCreateMapper,
        protected menuItemUpdateMapper: IMenuItemUpdateMapper,
        protected menuItemRepository: IMenuItemRepository
    ) {
        super()
    }

    public async create(menuItemData: MenuItemCreateInputDto): Promise<MenuItemCreateOutputDto> {
        const menuItemCreateInput = this.menuItemCreateMapper.toDbModel(menuItemData)
        const menuItemCreatedInstance = await this.menuItemRepository.create(menuItemCreateInput)
        return this.menuItemCreateMapper.toDto(menuItemCreatedInstance)
    }

    public async update(menuItemId: bigint, menuItemData: MenuItemUpdateInputDto): Promise<MenuItemUpdateOutputDto> {
        const menuItemInstance = await this.menuItemRepository.getOne(menuItemId)

        if (!menuItemInstance) {
            throw new MenuItemNotFoundWithIdError(menuItemId)
        }

        const menuItemUpdateInput = this.menuItemUpdateMapper.toDbModel(menuItemData)
        const menuItemUpdatedInstance = await this.menuItemRepository.update(menuItemId, menuItemUpdateInput) as MenuItemModel
        return this.menuItemUpdateMapper.toDto(menuItemUpdatedInstance)
    }

    public async delete(menuItemId: bigint): Promise<void> {
        const menuItemInstance = await this.menuItemRepository.getOne(menuItemId)

        if (!menuItemInstance) {
            throw new MenuItemNotFoundWithIdError(menuItemId)
        }

        await this.menuItemRepository.delete(menuItemId)
    }
}