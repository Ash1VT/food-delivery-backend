import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";

export const menuItemCreatedValidator = z.object({
    id: idValidator,
    name: z.string(),
    image_url: z.string(),
    price: z.coerce.number(),
    restaurant_id: idValidator
}).transform((menuItem) => {
    const { image_url: imageUrl, restaurant_id: restaurantId, ...rest } = menuItem

    return {
        ...rest,
        imageUrl,
        restaurantId
    }
})


export const menuItemUpdatedValidator = z.object({
    id: idValidator,
    name: z.string(),
    image_url: z.string(),
    price: z.coerce.number()
}).transform((menuItem) => {
    const { image_url: imageUrl, ...rest } = menuItem

    return {
        ...rest,
        imageUrl
    }
})


export const menuItemDeletedValidator = z.object({
    id: idValidator
})