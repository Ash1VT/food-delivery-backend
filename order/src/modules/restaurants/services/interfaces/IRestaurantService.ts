import ICreateService from "@src/base/services/interfaces/ICreateService";
import IGetService from "@src/base/services/interfaces/IGetService";
import { RestaurantGetOutputDTO, RestaurantCreateInputDTO, RestaurantCreateOutputDTO } from "../../dto/restaurant";

export default interface IRestaurantService extends IGetService<RestaurantGetOutputDTO>, ICreateService<RestaurantCreateInputDTO, RestaurantCreateOutputDTO> {}