import { DeliveryInformationCreateInput, DeliveryInformationModel, DeliveryInformationUpdateInput } from "../../models/deliveryInformation.models";
import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";
import { PriceInformationCreateInput, PriceInformationModel, PriceInformationUpdateInput } from "../../models/priceInformation.models";

export default interface IPriceInformationRepository extends IBaseRepository<PriceInformationModel, PriceInformationCreateInput, PriceInformationUpdateInput> {}