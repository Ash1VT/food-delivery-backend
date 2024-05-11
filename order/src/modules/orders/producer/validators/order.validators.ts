import { z } from "zod";

export const orderFinishedToReviewValidator = z.object({
    orderId: z.coerce.string()
})