import IPromocodeService from "../../interfaces/IPromocodeService"
import IPromotionService from "../../interfaces/IPromotionService"

export default interface IPromotionServiceFactory {
    createPromotionService(): IPromotionService
    createPromocodeService(): IPromocodeService
}