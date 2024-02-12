import IPromocodeRepository from "../../interfaces/IPromocodeRepository";
import IPromotionRepository from "../../interfaces/IPromotionRepository";

export default interface IPromotionRepositoryFactory {
    createPromocodeRepository(): IPromocodeRepository;
    createPromotionRepository(): IPromotionRepository;
}