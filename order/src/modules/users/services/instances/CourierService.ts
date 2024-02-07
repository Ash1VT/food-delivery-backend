import { CourierGetOutputDTO, CourierCreateInputDTO, CourierCreateOutputDTO } from "../../dto/courier";
import { ICourierGetMapper, ICourierCreateMapper } from "../../mappers/interfaces/courier";
import ICourierRepository from "../../repositories/interfaces/ICourierRepository";
import ICourierService from "../interfaces/ICourierService";
import { CourierNotFoundWithIdError } from "../../errors/courier";

export default class CourierService implements ICourierService {

    constructor(
        protected courierCreateMapper: ICourierCreateMapper,
        protected courierRepository: ICourierRepository
    ) {}

    // public async getOne(id: number): Promise<CourierGetOutputDTO> {
    //     const courierInstance = await this.courierRepository.getOne(id)

    //     if (!courierInstance) {
    //         throw new CourierNotFoundWithIdError(id)
    //     }

    //     return this.courierGetMapper.toDto(courierInstance)
    // }

    // public async getMany(): Promise<CourierGetOutputDTO[]> {
    //     const courierInstances = await this.courierRepository.getMany()
    //     return mapManyModels(courierInstances, this.courierGetMapper.toDto)
    // }

    public async create(courierData: CourierCreateInputDTO): Promise<CourierCreateOutputDTO> {
        const courierCreateInput = this.courierCreateMapper.toDbModel(courierData)
        const courierCreatedInstance = await this.courierRepository.create(courierCreateInput)
        return this.courierCreateMapper.toDto(courierCreatedInstance)
    }

}