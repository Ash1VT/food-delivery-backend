import IMenuItemRepository from "../../interfaces/IMenuItemRepository";

export default interface IMenuItemRepositoryFactory {
    createMenuItemRepository(): IMenuItemRepository;
}
