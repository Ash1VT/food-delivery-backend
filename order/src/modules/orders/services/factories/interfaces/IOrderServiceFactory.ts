import IOrderItemService from "../../interfaces/IOrderItemService"
import IOrderService from "../../interfaces/IOrderService"

export default interface IOrderServiceFactory {
    createOrderService(): IOrderService
    createOrderItemService(): IOrderItemService
}