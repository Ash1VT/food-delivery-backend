import { idValidator } from "@src/core/validators/idValidator";
import { z } from "zod";
import { dayOfWeekValidator } from "./dayOfWeek.validators";

export const timeValidator = z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Invalid time format" }) // Ensure the string is in HH:MM format
    .transform((timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set the time on a new Date object
    return date;
})

export const workingHoursCreatedValidator = z.object({
    id: idValidator,
    day_of_week: dayOfWeekValidator,
    opening_time: timeValidator,
    closing_time: timeValidator,
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
    opening_time: timeValidator,
    closing_time: timeValidator,
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