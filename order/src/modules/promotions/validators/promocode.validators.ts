import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";


const promocodeNameValidator = z.string().
    min(5, {
        message: "Name is too short. Minimum length is 5"
    }).
    max(20, {
        message: "Name is too long. Maximum length is 20"
    })

const promocodeDiscountPercentageValidator = z.coerce.number().
    min(5, {
        message: "Discount percentage is too small. Minimum value is 1"
    }).
    max(100, {
        message: "Discount percentage is too big. Maximum value is 100"
    })

const promocodeMaxUsageCountValidator = z.coerce.number().
    min(1, {
        message: "Maximum amount of promocode usages is too small. Minimum value is 1"
    })


export const promocodeCreateValidator = z.object({
    nameIdentifier: promocodeNameValidator,
    restaurantId: idValidator,
    discountPercentage: promocodeDiscountPercentageValidator,
    validFrom: z.coerce.date(),
    validUntil: z.coerce.date(),
    maxUsageCount: promocodeMaxUsageCountValidator
}).refine((promocode) => promocode.validFrom < promocode.validUntil, {
    message: "Valid from must be earlier than valid until"
}).refine((promocode) => promocode.validFrom >= new Date(Date.now()), {
    message: "Valid from cannot be earlier than current date"
})


export const promocodeUpdateValidator = z.object({
    discountPercentage: promocodeDiscountPercentageValidator,
    validFrom: z.coerce.date(),
    validUntil: z.coerce.date(),
    maxUsageCount: promocodeMaxUsageCountValidator
}).refine((promocode) => promocode.validFrom < promocode.validUntil, {
    message: "Valid from must be earlier than valid until"
}).refine((promocode) => promocode.validFrom >= new Date(Date.now()), {
    message: "Valid from cannot be earlier than current date"
})