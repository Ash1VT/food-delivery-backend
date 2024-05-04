import IBaseService from "@src/core/services/IBaseService";
import { CourierCreateInputDto, CourierCreateOutputDto, CourierGetOutputDto } from "../../dto/courier.dto";

export default interface ICourierService extends IBaseService {
    create(courierData: CourierCreateInputDto): Promise<CourierCreateOutputDto>
}