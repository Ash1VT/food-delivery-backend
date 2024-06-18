import getLogger from "@src/core/setup/logger";
import { PaymentInformationCreateOutputDto, PaymentInformationGetOutputDto, PaymentInformationUpdateOutputDto } from "../../dto/paymentInformation.dto";
import { PaymentInformationModel } from "../../models/paymentInformation.models";
import { IPaymentInformationCreateMapper, IPaymentInformationGetMapper, IPaymentInformationUpdateMapper } from "../interfaces/paymentInformation.mappers";


const logger = getLogger(module)


export class PaymentInformationGetMapper implements IPaymentInformationGetMapper{

    toDto(dbModel: PaymentInformationModel): PaymentInformationGetOutputDto {
        const data = {
            ...dbModel,
            id: dbModel.id.toString()
        }

        logger.debug(`Mapped database PaymentInformationModel with id=${dbModel.id} to PaymentInformationModelGetOutputDto`)

        return data
    }

}

export class PaymentInformationCreateMapper implements IPaymentInformationCreateMapper{
    toDto(dbModel: PaymentInformationModel): PaymentInformationCreateOutputDto {
        const data = {
            ...dbModel,
            id: dbModel.id.toString()
        }

        logger.debug(`Mapped database PaymentInformationModel with id=${dbModel.id} to PaymentInformationModelCreateOutputDto`)

        return data       
    }
}

export class PaymentInformationUpdateMapper implements IPaymentInformationUpdateMapper{
    toDto(dbModel: PaymentInformationModel): PaymentInformationUpdateOutputDto {
        const data = {
            ...dbModel,
            id: dbModel.id.toString()
        }

        logger.debug(`Mapped database PaymentInformationModel with id=${dbModel.id} to PaymentInformationModelUpdateOutputDto`)

        return data   
    }
}