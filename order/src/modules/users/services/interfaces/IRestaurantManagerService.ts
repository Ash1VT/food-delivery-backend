import ICreateService from "@src/base/services/interfaces/ICreateService";
import IGetService from "@src/base/services/interfaces/IGetService";
import { RestaurantManagerGetOutputDTO, RestaurantManagerCreateInputDTO, RestaurantManagerCreateOutputDTO } from "../../dto/restaurantManager";

export default interface IRestaurantManagerService extends IGetService<RestaurantManagerGetOutputDTO>, ICreateService<RestaurantManagerCreateInputDTO, RestaurantManagerCreateOutputDTO> {}