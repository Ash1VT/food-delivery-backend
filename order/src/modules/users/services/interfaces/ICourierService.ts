import ICreateService from "@src/base/services/interfaces/ICreateService";
import IGetService from "@src/base/services/interfaces/IGetService";
import { CourierCreateInputDTO, CourierCreateOutputDTO, CourierGetOutputDTO } from "../../dto/courier";

export default interface ICourierService extends IGetService<CourierGetOutputDTO>, ICreateService<CourierCreateInputDTO, CourierCreateOutputDTO> {}