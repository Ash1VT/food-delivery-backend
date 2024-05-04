import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";

export const restaurantCreateValidator = z.object({
    id: idValidator,
    restaurant_manager_id: idValidator,
    is_active: z.coerce.boolean()
}).transform((menuItem) => {
    const { is_active: isActive, restaurant_manager_id: restaurantManagerId, ...rest } = menuItem

    return {
        ...rest,
        isActive,
        restaurantManagerId
    }
})


export const restaurantUpdateValidator = z.object({
    is_active: z.coerce.boolean()
}).transform((menuItem) => {
    const { is_active: isActive } = menuItem

    return {
        isActive
    }
})