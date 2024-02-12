import IMenuItemService from "../../interfaces/IMenuItemService";

export default interface IMenuServiceFactory {
    createMenuItemService(): IMenuItemService
}