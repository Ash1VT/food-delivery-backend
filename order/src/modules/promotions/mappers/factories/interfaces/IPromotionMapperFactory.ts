import { IPromocodeGetMapper, IPromocodeCreateMapper, IPromocodeUpdateMapper } from "../../interfaces/promocode.mappers";

export default interface IPromotionMapperFactory {
    createPromocodeGetMapper(): IPromocodeGetMapper;
    createPromocodeCreateMapper(): IPromocodeCreateMapper;
    createPromocodeUpdateMapper(): IPromocodeUpdateMapper;
}