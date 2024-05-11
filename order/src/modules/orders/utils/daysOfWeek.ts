import { DayOfWeek } from "@src/modules/restaurants/models/dayOfWeek.models"

export const daysOfWeeks = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]


export const getDayOfWeek = (day: number): DayOfWeek => {
    return daysOfWeeks[day] as DayOfWeek
}