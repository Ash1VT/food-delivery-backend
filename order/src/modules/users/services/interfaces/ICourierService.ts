import { CourierCreateInputDTO, CourierCreateOutputDTO, CourierGetOutputDTO } from "../../dto/courier";

export default interface ICourierService {
    create(courierData: CourierCreateInputDTO): Promise<CourierCreateOutputDTO>
}