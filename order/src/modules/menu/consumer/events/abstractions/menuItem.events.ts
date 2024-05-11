import KafkaConsumerBaseEvent from "@src/kafka/consumer/events/KafkaConsumerBaseEvent"
import IMenuItemRepositoryFactory from "@src/modules/menu/repositories/factories/interfaces/IMenuItemRepositoryFactory"
import IMenuItemRepository from "@src/modules/menu/repositories/interfaces/IMenuItemRepository"
import { menuItemCreatedValidator, menuItemDeletedValidator, menuItemUpdatedValidator } from "../../validators/menuItem.validators"

export abstract class MenuItemCreatedBaseEvent extends KafkaConsumerBaseEvent {
    protected menuItemRepository: IMenuItemRepository

    constructor(
        data: any,
        protected menuItemRepositoryFactory: IMenuItemRepositoryFactory
    ) {
        super(data)
        this.menuItemRepository = menuItemRepositoryFactory.createMenuItemRepository()
    }

    public async action(): Promise<void> {
        const menuItemData = menuItemCreatedValidator.parse(this.data)
        await this.menuItemRepository.create(menuItemData)
    }

    public static getEventName(): string {
        return "MenuItemCreatedEvent"
    }
}


export abstract class MenuItemUpdatedBaseEvent extends KafkaConsumerBaseEvent {
    protected menuItemRepository: IMenuItemRepository

    constructor(
        data: any,
        protected menuItemRepositoryFactory: IMenuItemRepositoryFactory
    ) {
        super(data)
        this.menuItemRepository = menuItemRepositoryFactory.createMenuItemRepository()
    }

    public async action(): Promise<void> {
        const {id: menuItemId, ...menuItemData } = menuItemUpdatedValidator.parse(this.data)
        await this.menuItemRepository.update(menuItemId, menuItemData)
    }

    public static getEventName(): string {
        return "MenuItemUpdatedEvent"
    }
}


export abstract class MenuItemDeletedBaseEvent extends KafkaConsumerBaseEvent {
    protected menuItemRepository: IMenuItemRepository

    constructor(
        data: any,
        protected menuItemRepositoryFactory: IMenuItemRepositoryFactory
    ) {
        super(data)
        this.menuItemRepository = menuItemRepositoryFactory.createMenuItemRepository()
    }

    public async action(): Promise<void> {
        const {id: menuItemId} = menuItemDeletedValidator.parse(this.data)
        await this.menuItemRepository.delete(menuItemId)
    }

    public static getEventName(): string {
        return "MenuItemDeletedEvent"
    }
}
