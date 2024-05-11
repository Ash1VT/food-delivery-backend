import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";
import { dayOfWeekValidator } from "./dayOfWeek.validators";

export const workingHoursCreatedValidator = z.object({
    id: idValidator,
    day_of_week: dayOfWeekValidator,
    opening_time: z.coerce.date(),
    closing_time: z.coerce.date(),
    restaurant_id: idValidator
}).transform((menuItem) => {
    const { day_of_week: dayOfWeek, restaurant_id: restaurantId, opening_time: openingTime, closing_time: closingTime, ...rest } = menuItem

    return {
        ...rest,
        dayOfWeek,
        restaurantId,
        openingTime,
        closingTime
    }
})

export const workingHoursUpdatedValidator = z.object({
    id: idValidator,
    opening_time: z.coerce.date(),
    closing_time: z.coerce.date(),
}).transform((menuItem) => {
    const { opening_time: openingTime, closing_time: closingTime, ...rest } = menuItem

    return {
        ...rest,
        openingTime,
        closingTime
    }
})

export const workingHoursDeletedValidator = z.object({
    id: idValidator,
})