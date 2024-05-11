import { PrismaClient } from "@prisma/client";
import PrismaBaseRepository from "@src/core/repositories/prisma/PrismaBaseRepository";
import { WorkingHoursDelegate } from "./delegates";
import { WorkingHoursModel, WorkingHoursCreateInput, WorkingHoursUpdateInput } from "@src/modules/restaurants/models/workingHours.models";
import IWorkingHoursRepository from "../../interfaces/IWorkingHoursRepository";
import { DayOfWeek } from "@src/modules/restaurants/models/dayOfWeek.models";


export default class PrismaWorkingHoursRepository extends PrismaBaseRepository<WorkingHoursDelegate, WorkingHoursModel, WorkingHoursCreateInput, WorkingHoursUpdateInput> implements IWorkingHoursRepository {

    constructor(prisma: PrismaClient) {
        super(prisma.workingHours)
    }

    public async getRestaurantWorkingHours(restaurantId: bigint, dayOfWeek: DayOfWeek): Promise<WorkingHoursModel | null> {
        return await this.delegate.findFirst({
            where: {
                restaurantId,
                dayOfWeek
            }
        })
    }
    
}