import IPromocodeService from "@src/modules/promotions/services/interfaces/IPromocodeService";
import { OrderGetOutputDTO, OrderCreateInputDTO, OrderCreateOutputDTO } from "../../dto/order";
import { OrderNotFoundWithIdError } from "../../errors/order";
import { IOrderCreateMapper, IOrderGetMapper } from "../../mappers/interfaces/order";
import IOrderRepository from "../../repositories/interfaces/IOrderRepository";
import IOrderService from "../interfaces/IOrderService";
import { mapManyModels } from "@src/utils/mapManyModels";

export default class OrderService implements IOrderService {

    constructor(
        protected orderGetMapper: IOrderGetMapper,
        protected orderCreateMapper: IOrderCreateMapper,
        protected orderRepository: IOrderRepository,
        protected promocodeService: IPromocodeService
    ) {}

    public async getOne(id: number): Promise<OrderGetOutputDTO> {
        const orderInstance = await this.orderRepository.getOne(id)

        if (!orderInstance) {
            throw new OrderNotFoundWithIdError(id)
        }

        return this.orderGetMapper.toDto(orderInstance)
    }
    
    public async getMany(): Promise<OrderGetOutputDTO[]> {
        const orderInstances = await this.orderRepository.getMany(true)
        return mapManyModels(orderInstances, this.orderGetMapper.toDto)
    }
    
    public async create(data: OrderCreateInputDTO): Promise<OrderCreateOutputDTO> {
        throw new Error("Method not implemented.");
    }

}