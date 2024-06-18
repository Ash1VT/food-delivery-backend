import IBaseRepository from "@src/core/repositories/interfaces/IBaseRepository";
import { WorkingHoursCreateInput, WorkingHoursModel, WorkingHoursUpdateInput } from "../../models/workingHours.models";
import { DayOfWeek } from "../../models/dayOfWeek.models";

export default interface IWorkingHoursRepository extends IBaseRepository<WorkingHoursModel, WorkingHoursCreateInput, WorkingHoursUpdateInput> {
    getRestaurantWorkingHours(restaurantId: bigint, dayOfWeek: DayOfWeek): Promise<WorkingHoursModel | null>
}