import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";

const orderItemQuantityValidator = z.coerce.number().
    min(1, {
        message: "Quantity is too small. Minimum value is 1"
    }).
    max(100, {
        message: "Quantity is too big. Maximum value is 100"
    })


export const orderItemCreateValidator = z.object({
    menuItemId: idValidator,
    quantity: orderItemQuantityValidator
})