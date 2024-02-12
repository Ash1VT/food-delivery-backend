import { CourierCreateInputDto, CourierCreateOutputDto, CourierGetOutputDto } from "../../dto/courier.dto";

export default interface ICourierService {
    create(courierData: CourierCreateInputDto): Promise<CourierCreateOutputDto>
}