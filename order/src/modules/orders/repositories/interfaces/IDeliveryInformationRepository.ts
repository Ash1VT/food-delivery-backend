import { DeliveryInformationCreateInput, DeliveryInformationModel, DeliveryInformationUpdateInput } from "../../models/deliveryInformation.models";
import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";

export default interface IDeliveryInformationRepository extends IBaseRepository<DeliveryInformationModel, DeliveryInformationCreateInput, DeliveryInformationUpdateInput> {}