import { z } from "zod";

export const orderFinishedToReviewValidator = z.object({
    id: z.coerce.string(),
    customerId: z.coerce.string(),
    courierId: z.coerce.string()
}).transform((menuItem) => {
    const { customerId: customer_id, courierId: courier_id, ...rest } = menuItem

    return {
        ...rest,
        customer_id,
        courier_id
    }
})