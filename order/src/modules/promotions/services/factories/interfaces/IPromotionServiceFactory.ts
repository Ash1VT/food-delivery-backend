import IPromocodeService from "../../interfaces/IPromocodeService"

export default interface IPromotionServiceFactory {
    createPromocodeService(): IPromocodeService
}