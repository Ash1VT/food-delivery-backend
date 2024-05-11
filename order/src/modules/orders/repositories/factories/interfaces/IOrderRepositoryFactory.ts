import IDeliveryInformationRepository from "../../interfaces/IDeliveryInformationRepository";
import IOrderItemRepository from "../../interfaces/IOrderItemRepository";
import IOrderRepository from "../../interfaces/IOrderRepository";

export default interface IOrderRepositoryFactory {
    createOrderRepository(): IOrderRepository;
    createOrderItemRepository(): IOrderItemRepository;
    createDeliveryInformationRepository(): IDeliveryInformationRepository
}