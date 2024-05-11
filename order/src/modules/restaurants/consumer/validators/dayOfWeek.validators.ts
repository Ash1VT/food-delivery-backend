import { z } from "zod";
import { DayOfWeek } from "../../models/dayOfWeek.models";


export const dayOfWeekValidator = z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
]).transform((status) => status.toUpperCase() as DayOfWeek)