import IPromocodeRepository from "../../interfaces/IPromocodeRepository";

export default interface IPromotionRepositoryFactory {
    createPromocodeRepository(): IPromocodeRepository;
}