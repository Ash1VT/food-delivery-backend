import ICreateService from "@src/base/services/interfaces/ICreateService";
import IGetService from "@src/base/services/interfaces/IGetService";
import { PromotionGetOutputDTO, PromotionCreateInputDTO, PromotionCreateOutputDTO } from "../../dto/promotion";

export default interface IPromotionService extends IGetService<PromotionGetOutputDTO>, ICreateService<PromotionCreateInputDTO, PromotionCreateOutputDTO> {}