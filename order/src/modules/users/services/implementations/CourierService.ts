import BaseService from '@src/core/services/BaseService';
import { CourierGetOutputDto, CourierCreateInputDto, CourierCreateOutputDto } from "../../dto/courier.dto";
import { ICourierGetMapper, ICourierCreateMapper } from "../../mappers/interfaces/courier.mappers";
import ICourierRepository from "../../repositories/interfaces/ICourierRepository";
import ICourierService from "../interfaces/ICourierService";
import { CourierNotFoundWithIdError } from "../../errors/courier.errors";

export default class CourierService extends BaseService implements ICourierService {

    constructor(
        protected courierCreateMapper: ICourierCreateMapper,
        protected courierRepository: ICourierRepository
    ) {
        super()
    }

    public async create(courierData: CourierCreateInputDto): Promise<CourierCreateOutputDto> {
        const courierCreateInput = this.courierCreateMapper.toDbModel(courierData)
        const courierCreatedInstance = await this.courierRepository.create(courierCreateInput)
        return this.courierCreateMapper.toDto(courierCreatedInstance)
    }

}