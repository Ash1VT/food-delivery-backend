import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";
import { PaymentInformationCreateInput, PaymentInformationModel, PaymentInformationUpdateInput } from "../../models/paymentInformation.models";

export default interface IPaymentInformationRepository extends IBaseRepository<PaymentInformationModel, PaymentInformationCreateInput, PaymentInformationUpdateInput> {}