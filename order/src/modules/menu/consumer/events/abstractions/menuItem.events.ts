import { idValidator } from "@src/core/validators/idValidator"
import KafkaBaseEvent from "@src/kafka/consumer/events/KafkaBaseEvent"
import IMenuServiceFactory from "@src/modules/menu/services/factories/interfaces/IMenuItemServiceFactory"
import IMenuItemService from "@src/modules/menu/services/interfaces/IMenuItemService"
import { menuItemCreateValidator, menuItemUpdateValidator } from "@src/modules/menu/validators/menuItem.validators"

export abstract class MenuItemCreatedBaseEvent extends KafkaBaseEvent {
    protected menuItemService: IMenuItemService

    constructor(
        data: object,
        protected menuItemServiceFactory: IMenuServiceFactory
    ) {
        super(data)
        this.menuItemService = menuItemServiceFactory.createMenuItemService()
    }

    public async action(): Promise<void> {
        const menuItemData = menuItemCreateValidator.parse(this.data)
        await this.menuItemService.create(menuItemData)
    }

    public static getEventName(): string {
        return "MenuItemCreatedEvent"
    }
}


export abstract class MenuItemUpdatedBaseEvent extends KafkaBaseEvent {
    protected menuItemService: IMenuItemService

    constructor(
        data: object,
        protected menuItemServiceFactory: IMenuServiceFactory
    ) {
        super(data)
        this.menuItemService = menuItemServiceFactory.createMenuItemService()
    }

    public async action(): Promise<void> {
        const data = this.data as {id: bigint}
        const menuItemId = idValidator.parse(data.id)

        const menuItemData = menuItemUpdateValidator.parse(data)
        await this.menuItemService.update(menuItemId, menuItemData)
    }

    public static getEventName(): string {
        return "MenuItemUpdatedEvent"
    }
}


export abstract class MenuItemDeletedBaseEvent extends KafkaBaseEvent {
    protected menuItemService: IMenuItemService

    constructor(
        data: object,
        protected menuItemServiceFactory: IMenuServiceFactory
    ) {
        super(data)
        this.menuItemService = menuItemServiceFactory.createMenuItemService()
    }

    public async action(): Promise<void> {
        const data = this.data as {id: bigint}
        const menuItemId = idValidator.parse(data.id)
        await this.menuItemService.delete(menuItemId)
    }

    public static getEventName(): string {
        return "MenuItemDeletedEvent"
    }
}
