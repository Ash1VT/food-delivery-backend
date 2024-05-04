import { IPromocodeGetMapper, IPromocodeCreateMapper, IPromocodeUpdateMapper } from "../../interfaces/promocode.mappers";
import { IPromotionGetMapper, IPromotionCreateMapper } from "../../interfaces/promotion.mappers";

export default interface IPromotionMapperFactory {
    createPromocodeGetMapper(): IPromocodeGetMapper;
    createPromocodeCreateMapper(): IPromocodeCreateMapper;
    createPromocodeUpdateMapper(): IPromocodeUpdateMapper;
    createPromotionGetMapper(): IPromotionGetMapper;
    createPromotionCreateMapper(): IPromotionCreateMapper;
}