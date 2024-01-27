import IGetService from "@src/base/services/interfaces/IGetService";
import { MenuItemCreateInputDTO, MenuItemCreateOutputDTO, MenuItemGetOutputDTO, MenuItemUpdateOutputDTO } from "../../dto/menuItem";
import ICreateService from "@src/base/services/interfaces/ICreateService";

export default interface IMenuItemService extends IGetService<MenuItemGetOutputDTO>, ICreateService<MenuItemCreateInputDTO, MenuItemCreateOutputDTO> {}