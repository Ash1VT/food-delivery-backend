import { MenuItemCreateInputDto, MenuItemCreateOutputDto, MenuItemGetOutputDto } from "../../dto/menuItem.dto";
import { IMenuItemCreateMapper, IMenuItemGetMapper } from "../../mappers/interfaces/menuItem.mappers";
import BaseService from '@src/core/services/BaseService';
import IMenuItemRepository from "../../repositories/interfaces/IMenuItemRepository";
import IMenuItemService from "../interfaces/IMenuItemService";

export default class MenuItemService extends BaseService implements IMenuItemService {

    constructor(
        protected menuItemCreateMapper: IMenuItemCreateMapper,
        protected menuItemRepository: IMenuItemRepository
    ) {
        super()
    }

    public async create(menuItemData: MenuItemCreateInputDto): Promise<MenuItemCreateOutputDto> {
        const menuItemCreateInput = this.menuItemCreateMapper.toDbModel(menuItemData)
        const menuItemCreatedInstance = await this.menuItemRepository.create(menuItemCreateInput)
        return this.menuItemCreateMapper.toDto(menuItemCreatedInstance)
    }
}