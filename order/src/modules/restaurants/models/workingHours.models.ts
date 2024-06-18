import { DayOfWeek } from "./dayOfWeek.models"

export type WorkingHoursModel = {
    id: bigint
    dayOfWeek: DayOfWeek
    openingTime: Date
    closingTime: Date
    restaurantId: bigint
}

export type WorkingHoursCreateInput = {
    id: bigint
    dayOfWeek: DayOfWeek
    openingTime: Date
    closingTime: Date
    restaurantId: bigint
}

export type WorkingHoursUpdateInput = {
    id?: bigint
    dayOfWeek?: DayOfWeek
    openingTime?: Date
    closingTime?: Date
    restaurantId?: bigint
}