import { PromocodeGetMapper, PromocodeCreateMapper, PromocodeUpdateMapper } from "../../implementations/promocode.mappers";
import { PromotionGetMapper, PromotionCreateMapper } from "../../implementations/promotion.mappers";
import { IPromocodeGetMapper, IPromocodeCreateMapper, IPromocodeUpdateMapper } from "../../interfaces/promocode.mappers";
import { IPromotionGetMapper, IPromotionCreateMapper } from "../../interfaces/promotion.mappers";
import IPromotionMapperFactory from "../interfaces/IPromotionMapperFactory";

export default class PromotionMapperFactory implements IPromotionMapperFactory {
    public createPromocodeGetMapper(): IPromocodeGetMapper {
        return new PromocodeGetMapper();
    }

    public createPromocodeCreateMapper(): IPromocodeCreateMapper {
        return new PromocodeCreateMapper();
    }

    public createPromocodeUpdateMapper(): IPromocodeUpdateMapper {
        return new PromocodeUpdateMapper();
    }

    public createPromotionGetMapper(): IPromotionGetMapper {
        return new PromotionGetMapper();
    }

    public createPromotionCreateMapper(): IPromotionCreateMapper {
        return new PromotionCreateMapper();
    }
}