import { PromocodeGetMapper, PromocodeCreateMapper, PromocodeUpdateMapper } from "../../implementations/promocode.mappers";
import { IPromocodeGetMapper, IPromocodeCreateMapper, IPromocodeUpdateMapper } from "../../interfaces/promocode.mappers";
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

}