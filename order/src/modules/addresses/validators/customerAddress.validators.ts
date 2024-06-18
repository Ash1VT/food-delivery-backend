import { CustomerAddressApprovalStatus } from "@prisma/client";
import { z } from "zod";


const countryValidator = z
    .string()
    .min(1, {
        message: "Country is too short. Minimum length is 1"
    })
    .max(50, {
        message: "Country is too long. Maximum length is 50"
    })

const regionValidator = z
    .string()
    .min(1, {
        message: "Region is too short. Minimum length is 1"
    })
    .max(100, {
        message: "Region is too long. Maximum length is 100"
    })

const detailsValidator = z
    .string()
    .min(1, {
        message: "Details is too short. Minimum length is 1"
    })
    .max(150, {
        message: "Details is too long. Maximum length is 150"
    })


export const customerAddressCreateValidator = z.object({
    country: countryValidator,
    region: regionValidator,
    details: detailsValidator
})


export const customerAddressApprovalStatusValidator = z.enum([
    "approved",
    "pending",
    "rejected"
]).transform((status) => status.toUpperCase() as CustomerAddressApprovalStatus).optional()