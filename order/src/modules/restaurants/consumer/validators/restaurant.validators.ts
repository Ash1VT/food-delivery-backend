import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";

export const restaurantCreatedValidator = z.object({
    id: idValidator,
    restaurant_manager_id: idValidator,
    address: z.string(),
    is_active: z.coerce.boolean()
}).transform((menuItem) => {
    const { is_active: isActive, restaurant_manager_id: restaurantManagerId, ...rest } = menuItem

    return {
        ...rest,
        isActive,
        restaurantManagerId
    }
})

export const restaurantUpdatedValidator = z.object({
    id: idValidator,
    address: z.string().optional(),
    is_active: z.coerce.boolean().optional()
}).transform((menuItem) => {
    const { is_active: isActive, ...rest } = menuItem

    return {
        ...rest,
        isActive
    }
})